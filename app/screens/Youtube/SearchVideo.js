import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native'
import React from 'react'
import { Octicons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { getServiceSearchVideo } from '../../services';

const SearchVideo = ({ route, navigation }) => {
    const { result, search } = route.params;

    const handleOnPressDownload = (videoId) => {
        console.log(videoId)
        let xhr = new XMLHttpRequest();
        xhr.open('GET',
            'https://youtube-mp36.p.rapidapi.com/dl?' +
            'id=' + videoId);
        xhr.setRequestHeader('x-rapidapi-host', 'youtube-mp36.p.rapidapi.com');
        xhr.setRequestHeader('x-rapidapi-key', 'eb66da6e7bmsh55aa308e1cb5168p18bfe3jsn8432b906ac22');
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.response);
                if (res.status == "processing") {
                    setTimeout(function () {
                        handleOnPressDownload(id);
                    }, 1000);
                } else {
                    WebBrowser.openBrowserAsync(res.link);
                }
            } else if (xhr.readyState === 4 && xhr.status === 401) {
                console.log(">>> Error from get link")
            }
        };
        xhr.send(null);
    }

    const onPressPaging = async (pageToken) => {
        try {
            const { data } = await getServiceSearchVideo(search, pageToken);
            if (data && data.items) {
                navigation.navigate('Search', {
                    search: search,
                    result: data
                })
            }
        } catch (error) {
            console.warn('Error submmit search in SearchVideo.js');
            if (error && error.response && error.response.status) {
                console.log(error.response)
            } else {
                console.log(error.response ? error.response : error)
            }
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {result && result.items && result.items.map((item, id) =>
                    <Pressable key={id} onPress={() => navigation.navigate('Player', {
                        videoId: item.id.videoId
                    })}
                        style={styles.videoContainer}
                    >
                        <Image style={styles.videoImg} source={{
                            uri: item.snippet.thumbnails.maxres ? item.snippet.thumbnails.maxres.url :
                                item.snippet.thumbnails.standard ? item.snippet.thumbnails.standard.url :
                                    item.snippet.thumbnails.medium ? item.snippet.thumbnails.medium.url : item.snippet.thumbnails.default ? item.snippet.thumbnails.default.url : null
                        }} />
                        <View style={styles.videoDescription}>
                            <View style={styles.videoTxt}><Text style={styles.videoTitle}>{item.snippet.title}</Text>
                                <Text style={styles.videoChannelTitle}>{item.snippet.channelTitle}</Text></View>
                            <View style={styles.downloadBtn}>
                                <Pressable onPress={() => handleOnPressDownload(item.id.videoId)}>
                                    <Octicons name="download" size={24} color="gray" />
                                </Pressable>
                            </View>
                        </View>
                    </Pressable>
                )}
                <View style={styles.page}>
                    {result && result.prevPageToken
                        && <Pressable style={styles.back}
                            onPress={() => onPressPaging(result.prevPageToken)}
                        >
                            <Ionicons name="chevron-back" size={20} color="gray" />
                        </Pressable>}

                    {result && result.nextPageToken
                        && <Pressable style={styles.next}
                            onPress={() => onPressPaging(result.nextPageToken)}
                        >
                            <MaterialIcons name="navigate-next" size={24} color="gray" />
                        </Pressable>}
                </View>
            </ScrollView>
        </View>
    )
}

export default SearchVideo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    videoImg: {
        width: '100%',
        height: undefined,
        aspectRatio: 32 / 18,
        // borderRadius: 10
    }, downloadBtn: {
        margin: 10,
        borderColor: 'gray',
        borderWidth: 1.5,
        borderRadius: 50,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }, videoTxt: {
        padding: 5,
        paddingBottom: 20,
        maxWidth: 350,
    }, videoTitle: {
    }, videoChannelTitle: {
        fontSize: 10
    }, videoContainer: {

    }, videoDescription: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, page: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    next: {
        borderRadius: 7,
        borderWidth: 3,
        borderColor: 'gray',
        // padding: 2,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }, back: {
        borderRadius: 7,
        borderWidth: 3,
        borderColor: 'gray',
        padding: 2,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
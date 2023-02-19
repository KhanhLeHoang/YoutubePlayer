import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native'
import React from 'react'
import { getServiceVideosPlaylist } from '../../services'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Octicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

const PlaylistItems = ({ route, navigation }) => {
    const [playlistItems, setPlaylistItems] = useState([])
    const [linkDownload, setLinkDownload] = useState('');
    const { playlistId, playlistTitle } = route.params;
    const { access_token, userData } = useSelector(state => state.reducer);

    const getVideos = async () => {
        try {
            const { data } = await getServiceVideosPlaylist(playlistId, access_token);
            // console.log(data.items === null);
            setPlaylistItems(data.items);
            (data.items).forEach(item => {
                console.log(item.snippet.title)
            });
        } catch (error) {
            console.warn('>>> Error while get playlist items (PlaylistItems.js)');
            console.log(error);
        }
    }

    if (!playlistItems.length > 0)
        getVideos();

    function mp3Conversion(id) {
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://youtube-mp36.p.rapidapi.com/dl?id=" + id,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "eb66da6e7bmsh55aa308e1cb5168p18bfe3jsn8432b906ac22",
                "x-rapidapi-host": "youtube-mp36.p.rapidapi.com"
            }
        };

        $.ajax(settings).done(function (response) {
            if (response.status == "processing") {
                setTimeout(function () {
                    mp3Conversion(id);
                }, 1000);
            } else {
                console.log(response);
            }
        });
    }

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
    return (
        <View style={styles.container}>
            <ScrollView>
                {playlistItems && playlistItems.map((item, id) =>
                    <Pressable key={id} onPress={() => navigation.navigate('Player', {
                        videoId: item.snippet.resourceId.videoId
                    })}
                        style={styles.videoContainer}
                    >
                        <Image style={styles.videoImg} source={{
                            uri: item.snippet.thumbnails.maxres ? item.snippet.thumbnails.maxres.url :
                                item.snippet.thumbnails.standard ? item.snippet.thumbnails.standard.url :
                                    item.snippet.thumbnails.medium ? item.snippet.thumbnails.medium.url : item.snippet.thumbnails.default.url
                        }} />
                        <View style={styles.videoDescription}>
                            <View style={styles.videoTxt}><Text style={styles.videoTitle}>{item.snippet.title}</Text>
                                <Text style={styles.videoChannelTitle}>{item.snippet.videoOwnerChannelTitle}</Text></View>
                            <View style={styles.downloadBtn}><Pressable onPress={() => handleOnPressDownload(item.snippet.resourceId.videoId)}><Octicons name="download" size={24} color="blue" /></Pressable></View>
                        </View>
                    </Pressable>
                )}
            </ScrollView>
        </View>
    )
}

export default PlaylistItems

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
        borderColor: 'blue',
        borderWidth: 1.5,
        borderRadius: 50,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }, videoTxt: {
        padding: 5,
        paddingBottom: 20,
        // backgroundColor: 'red',
        maxWidth: 350,
    }, videoTitle: {
        // backgroundColor: 'red',
        // marginRight: 20
    }, videoChannelTitle: {
        fontSize: 10
    }
    , videoContainer: {

    }, videoDescription: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
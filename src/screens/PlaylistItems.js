import { StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native'
import React from 'react'
import { getServiceVideosPlaylist } from '../services'
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

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

    const handleOnPressDownload = () => {
        if (linkDownload)
            WebBrowser.openBrowserAsync(linkDownload);
    }

    const handleOnPressGetLink = () => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET',
            'https://youtube-mp36.p.rapidapi.com/dl?' +
            'id=' + 'rYH7Y-43SJc');
        xhr.setRequestHeader('x-rapidapi-host', 'youtube-mp36.p.rapidapi.com');
        xhr.setRequestHeader('x-rapidapi-key', 'eb66da6e7bmsh55aa308e1cb5168p18bfe3jsn8432b906ac22');
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const res = JSON.parse(xhr.response);
                if (res.link)
                    setLinkDownload(res.link)
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
                    <Pressable key={id}>
                        <Image style={styles.videoImg} source={{ uri: item.snippet.thumbnails.default.url }} />
                        <Text>{item.snippet.title}</Text>
                        <Text>{item.snippet.videoOwnerChannelTitle}</Text>
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
    }
})
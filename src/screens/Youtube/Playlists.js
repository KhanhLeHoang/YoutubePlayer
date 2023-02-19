import React from "react";
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from '../../redux/actions';
import { useState } from 'react';
import { getServicePlaylist } from '../../services';

const Playlists = ({ navigation }) => {
    const [playlistArray, setPlaylistArray] = useState([]);

    const { access_token } = useSelector(state => state.reducer);
    const dispatch = useDispatch();

    const getPlaylist = async (token, isLoop = false) => {
        try {
            const { data } = await getServicePlaylist(token, 50);
            setPlaylistArray(data.items);
        }
        catch (error) {
            if (error && error.response && error.response.status === 401 && !isLoop) {
                console.log("Error from get playlist");
                dispatch(refreshToken()).then(data => {
                    console.log('dispatch refresh token return: ', data)
                    getPlaylist(data, true);
                }).catch(e => console.warn(e))
            } else {
                console.log(error.response ? error.response : error)
                console.warn("Error refresh token to get playlist (Playlist.js)")
            }
        }
    }
    if (!playlistArray.length > 0) {
        getPlaylist(access_token)
    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}
            >
                <View style={styles.playlistContainer}>
                    {playlistArray && playlistArray.map((item, index, arr) => (
                        <Pressable key={index} style={styles.playlistItems} onPress={() => navigation.navigate('PlaylistItems', {
                            playlistId: item.id,
                            playlistTitle: item.snippet.title
                        })}
                        >
                            <Image style={styles.playlistImg}
                                source={{
                                    uri: item.snippet.thumbnails.maxres ? item.snippet.thumbnails.maxres.url :
                                        item.snippet.thumbnails.standard ? item.snippet.thumbnails.standard.url :
                                            item.snippet.thumbnails.medium ? item.snippet.thumbnails.medium.url : item.snippet.thumbnails.default.url
                                }}
                                resizeMode='stretch'
                            />
                            <Text style={styles.playlistItemText}>{item.snippet.title}</Text>
                            <Text>{item.contentDetails.itemCount}</Text>
                        </Pressable>
                    ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Playlists

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    playlistContainer: {
        marginBottom: '10%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10
    },
    playlistItems: {
        flexBasis: '33.3333333%',
        padding: 10,
    },
    playlistImg: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 10
    },
    playlistItemText: {
        fontSize: 14,
        paddingTop: 5
    }
})
import React from "react";
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { storeData, getData, storageClearData } from '../../library/AsyncStore';
import { useSelector, useDispatch } from 'react-redux';
import { setAccess_token, setUserData, refreshToken } from '../../redux/actions';
import Login from './Login';
import SearchYoutube from "../../components/SearchYoutube";
import { getServicePlaylist, getServiceUserData, postServiceCodeForToken, getServiceSearchVideo } from '../../services';



export default function Home({ navigation }) {
  const [playlistArray, setPlaylistArray] = useState([]);

  const { access_token, userData } = useSelector(state => state.reducer);
  const dispatch = useDispatch();
  // storageClearData();

  console.log('render: ', playlistArray.length > 0)
  const url = Linking.useURL();
  console.log(url)
  const getPlaylist = async (token, isLoop = false) => {
    try {
      console.log('access_token: ', token);
      const { data } = await getServicePlaylist(token, 6);
      // console.log(data);
      setPlaylistArray(data.items);
    }
    catch (error) {
      if (error && error.response && error.response.status === 401 && !isLoop) {
        console.log("getPlaylist return with status code 401");
        dispatch(refreshToken()).then(data => {
          console.log('dispatch refresh token return in getPlaylist: ', data)
          getPlaylist(data, true);
        }).catch(e => console.warn(e))
      } else {
        console.log(error.response.data)
        console.warn("Error refresh token to get playlist (Home.js)")
      }
    }
  }

  const postExchangeCodeForToken = async (code) => {
    try {
      console.log(code)
      const { data } = await postServiceCodeForToken(code);
      console.log('Exchange code response ', data)
      storeData('refresh_token', data.refresh_token);
      dispatch(setAccess_token(data.access_token));
      if (!userData)
        getUserData(data.access_token);
      // if (!playlistArray.length > 0) {
      // getPlaylist(data.access_token);
      // }
    } catch (error) {
      if (error && error.response)
        console.log(error.response.data)
    }
  }

  if (!userData && !access_token) {
    getData('refresh_token')
      .then(refresh_token_AsyncStorage => {
        if (refresh_token_AsyncStorage === null) {  // AsyncStorage dont have refresh_token
          let paramsUrl = {};
          if (access_token === '' && url && url !== '' && url.indexOf('?') !== -1) {
            // console.log('url: ', url)
            let fragmentString = url.substring(url.indexOf('?') + 1);

            // Parse query string to see if page request is coming from OAuth 2.0 server.
            let regex = /([^&=]+)=([^&]*)/g, m;
            while (m = regex.exec(fragmentString)) {
              paramsUrl[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            }

            postExchangeCodeForToken(paramsUrl['code']);

            // setIsLogged(true);
          }

        } else {  // Have refresh_token in AsyncStorage
          if (!access_token) {
            dispatch(refreshToken()).then(data => {
              console.log('dispatch refresh token return: ', data)
              if (!userData)
                getUserData(data);

              // if (!playlistArray.length > 0) {
              // getPlaylist(data)
              // }
            }).catch(e => console.warn(e))
          }
          // else if (!userData) {
          //   getUserData(access_token);

          //   if (!playlistArray.length > 0) {
          //     getPlaylist(access_token)
          //   }
          // }
          // setIsLogged(true)
        }
      })
      .catch(e => console.log(e))
  }

  async function getUserData(access_token) {
    try {
      const { data } = await getServiceUserData(access_token)
      dispatch(setUserData(data));
      getPlaylist(access_token);
      // console.log('user data: ', data)
    } catch (error) {
      if (error && error.response) {
        console.warn('>>> Error from get user data (Home.js)');
        console.log(error.response.data);
      }
    }
  }

  if (userData && access_token) {//playlistArray.length > 0) {
    return (
      <View style={styles.container}>
        <SearchYoutube />
        <View style={styles.playlistTextContainer}>
          <Text style={styles.title}>MY PLAYLIST</Text>
          <Pressable style={styles.more} onPress={() => navigation.navigate('Playlists')} >
            <Text style={{ textDecorationLine: 'underline', fontSize: 13, fontWeight: '500' }}>More...</Text>
          </Pressable>
        </View>
        <View style={styles.playlistContainer}>
          {playlistArray.map((item, index, arr) => (
            <Pressable key={index} style={styles.playlistItems} onPress={() => navigation.navigate('PlaylistItems', {
              playlistId: item.id,
              playlistTitle: item.snippet.title
            })}>
              <Image style={styles.playlistImg} resizeMode='cover' source={{ uri: item.snippet.thumbnails.default.url.replace('default.jpg', 'maxresdefault.jpg') }} />
              <Text style={styles.playlistItemText}>{item.snippet.title}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    )
  } else {
    return (<>
      <Login />
    </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  playlistContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10
  },
  playlistTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '15%',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    // marginBottom: 20
  },
  title: {
    color: 'red',
    fontSize: 24,
    fontWeight: '700'
  },
  more: {
    padding: 5
  },
  playlistItems: {
    flexBasis: '33.33333%',
    padding: 10,
    marginTop: '5%'
  },
  playlistImg: {
    width: undefined,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  playlistItemText: {
    fontSize: 14,
    paddingTop: 5
  }
});

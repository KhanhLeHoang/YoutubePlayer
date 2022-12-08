import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import { A } from '@expo/html-elements';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';

export default function Home() {
  const [linkDownload, setLinkDownload] = useState('');
  const [userData, setUserData] = useState({});
  const url = Linking.useURL();
  let params = {};
  if (url && url !== '' && url.indexOf('#') !== -1) {
    let fragmentString = url.substring(url.indexOf('#') + 1);

    // Parse query string to see if page request is coming from OAuth 2.0 server.
    let regex = /([^&=]+)=([^&]*)/g, m;
    while (m = regex.exec(fragmentString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    console.log(params)
    getUserData();
  }

  const handleOnPressLogin = () => {
    WebBrowser.openAuthSessionAsync("https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=https://redirect-youtubemp3.surge.sh&client_id=850495118825-fqhk6ub7t74vgtsd0ii3orkf088m505n.apps.googleusercontent.com")
  }

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${params['access_token']}`
      }
    }
    )

    userInfoResponse.json().then(data => {
      console.log(data);
      setUserData(data);
    });
  }

  const handleOnPressGetPlaylist = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET',
      'https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=50&mine=true&fields=nextPageToken%2C%20pageInfo%2C%20items%2Fsnippet%2Ftitle%2Citems%2Fid&key=AIzaSyCqzGtwHiNTXr1Z_RNAT7DvXiFdb5rjZqc&' +
      'access_token=' + params['access_token']);
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.response);
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        // Token invalid, so prompt for user permission.
      }
    };
    xhr.send(null);
  }
  const handleOnPressDownload = () => {
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
        // Token invalid, so prompt for user permission.
      }
    };
    xhr.send(null);
  }
  return (
    <View style={styles.container}>
      <Text>YOUTUBE MP3</Text>
      <Button
        title="Login"
        onPress={handleOnPressLogin}
        style={styles.button}
      />
      <Button
        title='Get my youtube playlist'
        onPress={handleOnPressGetPlaylist}
        style={styles.button}
      />
      <Button
        title='Get link download youtube video'
        onPress={handleOnPressDownload}
        style={styles.button}
      />
      {linkDownload !== '' ? <A href={linkDownload}>Download link</A> : <></>}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerWebview: {
    flex: 1
  }
});

import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { A } from '@expo/html-elements';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { storeData, getData } from '../Library/AsyncStore';
import { refreshToken } from '../YoutubeAPI';

export default function Home() {
  const [linkDownload, setLinkDownload] = useState('');
  const [userData, setUserData] = useState();
  const [access_token, setAccess_token] = useState('');
  const url = Linking.useURL();


  let paramsUrl = {};
  // console.log(url)
  if (url && url !== '' && url.indexOf('?') !== -1 && !access_token) {
    let fragmentString = url.substring(url.indexOf('?') + 1);

    // Parse query string to see if page request is coming from OAuth 2.0 server.
    let regex = /([^&=]+)=([^&]*)/g, m;
    while (m = regex.exec(fragmentString)) {
      paramsUrl[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://oauth2.googleapis.com/token', true)
    // console.log(paramsUrl)

    const params = `code=${paramsUrl['code']}&client_id=850495118825-fqhk6ub7t74vgtsd0ii3orkf088m505n.apps.googleusercontent.com&client_secret=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&redirect_uri=https://redirect-myapp.surge.sh&grant_type=authorization_code`;
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const res = JSON.parse(xhr.response);
        console.log(res);
        if (!userData)
          getUserData(res.access_token);
        storeData('access_token', res.access_token);
        storeData('refresh_token', res.refresh_token);
        setAccess_token(res.access_token);
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        // Token invalid, so prompt for user permission.
        console.log("Error from get code")
      }
    };
    xhr.send(params);
  }

  async function getUserData(access_token) {
    // console.log(access_token)
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    userInfoResponse.json().then(data => {
      setUserData(data);
      console.log('data: ', data)
    })
  }


  const handleOnPressLogin = async () => {
    WebBrowser.openAuthSessionAsync("https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=code&redirect_uri=https://redirect-myapp.surge.sh&client_id=850495118825-fqhk6ub7t74vgtsd0ii3orkf088m505n.apps.googleusercontent.com&access_type=offline&prompt=consent")
  }

  const handleOnPressDownload = () => {
    if (linkDownload)
      WebBrowser.openBrowserAsync(linkDownload);
  }

  const handleOnPressGetPlaylist = async (token) => {

    // console.log(token)
    let xhr = new XMLHttpRequest();
    xhr.open('GET',
      'https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=6&mine=true&fields=nextPageToken%2C%20pageInfo%2C%20items%2Fsnippet%2Ftitle%2Citems%2Fid%2Citems%2Fsnippet%2Fthumbnails%2Fdefault&key=AIzaSyCqzGtwHiNTXr1Z_RNAT7DvXiFdb5rjZqc&' +
      'access_token=' + token);
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // console.log(xhr.response);
        console.log('ok')
      } else if (xhr.readyState === 4 && xhr.status === 401) {
        // Token invalid, so prompt for user permission.
        console.warn("Error from get playlist");
        getData('refresh_token').then(data => {
          refreshToken(data).then(new_access_token => {
            if (new_access_token !== access_token) {
              handleOnPressGetPlaylist(new_access_token);
              setAccess_token(new_access_token);
            }
          })
        }).catch(err => console.log(err));
      }
    };
    xhr.send(null);
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
        // Token invalid, so prompt for user permission.
      }
    };
    xhr.send(null);
  }
  return (
    <View style={styles.container}>
      <Image style={{ width: 200, height: 200, marginBottom: 100, marginTop: 20 }} source={require('../../assets/logo.png')} />
      {access_token ?
        <>
          <Pressable
            onPress={() => handleOnPressGetPlaylist(access_token)}
            style={styles.button}
          >
            <Text style={styles.text}>Get my youtube playlist</Text>
          </Pressable>
          <Pressable
            onPress={handleOnPressGetLink}
            style={styles.button}
          >
            <Text style={styles.text}>Get link download youtube video</Text>
          </Pressable>
          <Pressable
            onPress={handleOnPressDownload}
            style={styles.button}
          >
            <Text style={styles.text}>Download link</Text>
          </Pressable>
        </>
        :
        <Pressable
          onPress={handleOnPressLogin}
          style={styles.buttonSignin}
        ><Text style={styles.text}>Sign in with Google</Text>
        </Pressable>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "red",
    borderWidth: 2,
    borderColor: 'black',
    width: '70%',
    paddingBottom: 15,
    paddingTop: 15,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 0,
    marginTop: 10
  },
  buttonSignin: {
    marginTop: 180,
    backgroundColor: "#4285f4",
    width: '70%',
    paddingBottom: 15,
    paddingTop: 15,
    alignItems: 'center',
    borderRadius: 4,
    elevation: 0,
  },
  text: {
    color: 'white',
    fontSize: 16
  }
});

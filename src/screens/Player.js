import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview'

const Player = ({ route, navigation }) => {
    const { videoId } = route.params;
    console.log(videoId)
    return (
        <View style={{ flex: 1 }}><WebView
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scrollEnabled={false}
            source={{
                uri: 'https://www.youtube.com/embed/' + videoId + `?controls=0&showinfo=0&wmode=transparent&rel=0&mode=opaque`,
            }}
            style={{
                height: 200,
            }}
            onError={(err) => {
                console.log(err, 'this is errr');
            }}
        />
        </View>
    )
}

export default Player

const styles = StyleSheet.create({

})
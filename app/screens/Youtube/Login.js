import { StyleSheet, Text, Image, Pressable, View } from 'react-native';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as VARIABLE from '../../variables';

const Login = () => {
    const handleOnPressLogin = async () => {
        WebBrowser.openAuthSessionAsync(`https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=code&redirect_uri=https://redirect-myapp.surge.sh&client_id=${VARIABLE.CLIENT_ID}&access_type=offline&prompt=consent`)
    }

    return (
        <View style={styles.container}>
            <Image style={{ width: 200, height: 200, marginBottom: 100, marginTop: 40 }} source={require('../../../assets/logo.png')} />
            <Pressable
                onPress={handleOnPressLogin}
                style={styles.buttonSignin}
            ><Text style={styles.text}>Sign in with Google</Text>
            </Pressable>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    buttonSignin: {
        marginTop: 140,
        backgroundColor: "#4285f4",
        // width: '40%',
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 12,
        paddingTop: 12,
        alignItems: 'center',
        borderRadius: 6,
        elevation: 0,
    },
    text: {
        color: 'white',
        fontSize: 16
    }
})
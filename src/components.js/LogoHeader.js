import { StyleSheet, Image, View } from 'react-native';

const LogoHeader = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../assets/logo.png')} />
        </View>
    )
}

export default LogoHeader;

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    }, img: {
        height: '150%',
        width: undefined,
        aspectRatio: 1,
    }
})
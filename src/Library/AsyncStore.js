import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        // console.log(key, value)
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
        console.log('Error from store data AsyncStorage', e);
    }
}

const getData = async (key) => {
    try {
        // console.log(key)
        return await AsyncStorage.getItem(key);
    } catch (e) {
        // error reading value
        console.log('Error from get data AsyncStorage', e);
    }
}

export { storeData, getData };
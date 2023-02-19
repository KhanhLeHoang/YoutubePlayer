import { Pressable, View, Image, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

const GmailButton = () => {
    const [modalGmail, setModalGmail] = useState(false)

    const { userData } = useSelector(state => state.reducer);
    // console.log(userData)
    const handleToggleModal = () => {
        setModalGmail(!modalGmail);
    }
    if (userData)
        return (
            <>
                <Pressable
                    style={styles.btnAva}
                    onPress={handleToggleModal}
                >
                    <Image
                        source={{ uri: userData.picture }}
                        style={styles.img}
                    />
                </Pressable>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalGmail}
                >
                    <View
                        style={styles.modalContainer}>
                        <Text style={styles.modalName}>{userData.name}</Text>
                        <Pressable
                            style={styles.signoutBtn}
                        >
                            <MaterialIcons style={styles.iconLogout} name="logout" size={24} color="white" />
                            <Text style={styles.signoutText}> SIGN OUT</Text>
                        </Pressable>
                    </View>
                </Modal>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalGmail}
                >
                    <TouchableOpacity
                        style={{
                            height: '80%',
                            marginBottom: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.3)'
                        }}
                        activeOpacity={1}
                        onPressOut={() => { setModalGmail(false) }}
                    >
                    </TouchableOpacity>
                </Modal>
            </>
        )
}

export default GmailButton

const styles = StyleSheet.create({
    img: {
        backgroundColor: 'red',
        width: 35,
        height: 35,
        borderRadius: 150 / 2
    },
    btnAva: {
        zIndex: 1,
        position: 'relative',
        marginRight: 20,
        // marginTop: '30%'
    },
    modalName: {
        fontSize: 20,
        marginBottom: 30,
        paddingTop: 20,
        alignSelf: 'center'
    },
    modalContainer: {
        height: '20%',
        marginTop: 'auto',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    signoutBtn: {
        backgroundColor: "#4285f4",
        width: '60%',
        alignSelf: 'center',
        marginBottom: 10,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // alignContent: 'center'
    },
    signoutText: {
        fontWeight: '500',
        fontSize: 20,
        color: 'white',
        paddingLeft: 4,
        paddingBottom: 4,
        paddingTop: 4,
    },
    iconLogout: {
        marginLeft: 5,
        alignSelf: 'center'
    }
})
import { Pressable, View, Image, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { postServiceRevokeToken } from '../services';
import { getData, storageClearData } from '../library/AsyncStore';
import { setAccess_token, setUserData } from '../redux/actions';
import * as RootNavigation from '../RootNavigation';


const GmailButton = ({ navigation }) => {
  const [modalGmail, setModalGmail] = useState(false)

  const { userData } = useSelector(state => state.reducer);
  const dispatch = useDispatch();

  const handleToggleModal = () => {
    setModalGmail(!modalGmail);
  }

  const onPressLogOut = () => {
    console.log("press log out")
    try {
      getData('refresh_token').then(async (refresh_token) => {
        // console.log('resfresh_token', refresh_token)
        const data = await postServiceRevokeToken(refresh_token);
        if (data && data.status === 200) {
          storageClearData();
          dispatch(setAccess_token(''));
          dispatch(setUserData(null));
          setModalGmail(false);
          RootNavigation.navigate('Home');
        } else {
          console.log(data)
        }
      }).catch(e => { console.log('Error get AsyncStorage refresh_token (GmailButton.js)'); console.log(e) })
    } catch (error) {
      console.warn('Error when log out in GmailButton.js');
      if (error && error.response && error.response.status) {
        console.log(error.response)
      } else {
        console.log(error.response ? error.response : error)
      }
    }
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
          animationType="none"
          transparent={true}
          visible={modalGmail}
        >
          <Pressable
            style={styles.backgroundModal}
            onPress={() => { setModalGmail(false) }}
          >
          </Pressable>
          <View
            style={styles.modalContainer}>
            <Text style={styles.modalName}>{userData.name}</Text>
            <Pressable
              onPress={onPressLogOut}
              style={styles.signoutBtn}
            >
              <MaterialIcons style={styles.iconLogout} name="logout" size={24} color="white" />
              <Text style={styles.signoutText}> SIGN OUT</Text>
            </Pressable>
          </View>
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
  backgroundModal: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '80%'
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
import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { getServiceSearchVideo } from '../services'
import * as RootNavigation from '../RootNavigation';

const SearchYoutube = () => {
  const [textSearch, setTextSearch] = useState('');


  const onSubmitSearch = async () => {
    try {
      console.log(textSearch)
      const { data } = await getServiceSearchVideo(textSearch);
      console.log(data.items.snippet)
      if (data && data.items) {

        RootNavigation.navigate('Search', {
          search: textSearch,
          result: data
        });
      }
    } catch (error) {
      console.warn('Error submmit search in SearchYoutube.js');
      if (error && error.response && error.response.status) {
        console.log(error.response)
      } else {
        console.log(error.response ? error.response : error)
      }
    }
  }

  return (
    <View style={styles.searchContainer}>
      <MaterialIcons style={styles.searchIcon} name="search" size={24} color="black" />
      <TextInput style={styles.searchInput}
        value={textSearch}
        placeholder='Search for videos...'
        onSubmitEditing={() => { onSubmitSearch() }}
        onChangeText={(val) => { setTextSearch(val) }}
      />
    </View>
  )
}

export default SearchYoutube

const styles = StyleSheet.create({

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20%',
    borderColor: 'black',
    borderWidth: 1,
    marginRight: '10%',
    marginLeft: '10%',
    borderRadius: 10,
    marginTop: '25%'
  },
  searchInput: {
    height: 40,
    width: '70%',
  },
  searchIcon: {
    padding: 10,
  },
})
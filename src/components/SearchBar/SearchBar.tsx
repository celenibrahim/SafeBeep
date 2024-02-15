import React from 'react';
import {TextInput, View} from 'react-native';
import styles from './SearchBar.style';
const SearchBar = ({placeholder, onChangeText}: any) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder={placeholder} onChangeText={onChangeText} />
    </View>
  );
};
export default SearchBar;

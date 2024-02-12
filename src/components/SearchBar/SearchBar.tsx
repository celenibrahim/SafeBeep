import React from 'react';
import {TextInput, View} from 'react-native';
import styles from './SearchBar.style';
const SearchBar = ({placeholder}: any) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder={placeholder} />
    </View>
  );
};
export default SearchBar;

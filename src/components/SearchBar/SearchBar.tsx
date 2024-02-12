import React from 'react';
import {TextInput, View} from 'react-native';
import styles from './SearchBar.style';
const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Search..." />
    </View>
  );
};
export default SearchBar;

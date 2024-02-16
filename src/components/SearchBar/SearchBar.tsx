import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
const SearchBar = ({placeholder, onChangeText}: any) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder={placeholder} onChangeText={onChangeText} />
    </View>
  );
};
export default SearchBar;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#e5ebee',
    margin: 5,
    borderColor: 'gray',
    borderRadius: 30,
  },
});

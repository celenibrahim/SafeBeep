import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import styles from './SellScreen.styles';
import SearchBar from '../../../components/SearchBar';
function SellScreen() {
  return (
    <ScrollView style={styles.container}>
      <SearchBar />
      <Text>This is Sell Page!</Text>
    </ScrollView>
  );
}
export default SellScreen;

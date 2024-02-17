import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const FavButton = ({iconUrl, onPress}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={styles.icon} source={iconUrl} />
    </TouchableOpacity>
  );
};

export default FavButton;

const styles = StyleSheet.create({
  icon: {
    margin: 12,
    width: Dimensions.get('screen').width / 16,
    height: Dimensions.get('screen').height / 35,
    borderRadius: 30,
  },
});

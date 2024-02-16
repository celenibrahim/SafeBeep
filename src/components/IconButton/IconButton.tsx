import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

const IconButton = ({iconUrl, onpress}: any) => {
  return (
    <TouchableOpacity onPress={onpress}>
      <Image style={styles.icon} source={iconUrl} />
    </TouchableOpacity>
  );
};
export default IconButton;
const styles = StyleSheet.create({
  icon: {
    width: Dimensions.get('screen').width / 8,
    height: Dimensions.get('window').height / 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
  },
});

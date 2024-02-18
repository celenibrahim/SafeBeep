import React from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';

const CartButton = ({iconUrl, onpress}: any) => {
  return (
    <View>
      <TouchableOpacity onPress={onpress}>
        <Image style={styles.icon} source={iconUrl} />
      </TouchableOpacity>
    </View>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  icon: {
    width: Dimensions.get('screen').width / 8,
    height: Dimensions.get('window').height / 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    margin: 1,
  },
});

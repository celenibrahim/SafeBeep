import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './Button.styles';
const Button = ({text, onPress}: {text: string; onPress: any}) => {
  return (
    <TouchableOpacity
      testID="button-touchable"
      style={styles.container}
      onPress={onPress}>
      <Text testID="button-title" style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default Button;

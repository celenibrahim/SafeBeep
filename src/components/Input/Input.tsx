import React from 'react';
import {TextInput, Text, View} from 'react-native';

import styles from './Input.style';

function Input({
  label,
  placeholder,
  onChangeText,
  value,
}: {
  label: string;
  placeholder: string;
  onChangeText: any;
  value: any;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input_container}>
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </View>
  );
}
export default Input;

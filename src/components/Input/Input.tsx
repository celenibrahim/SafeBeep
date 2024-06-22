import React from 'react';
import {TextInput, Text, View} from 'react-native';

import styles from './Input.style';

function Input({
  label,
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
}: {
  label: string;
  placeholder: string;
  onChangeText: any;
  value: any;
  secureTextEntry: boolean;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input_container}>
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
}
export default Input;

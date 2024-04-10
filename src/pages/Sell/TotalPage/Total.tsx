import {View} from 'react-native';
import React from 'react';
import styles from './Total.styles';
import PaymentButtons from '../../../components/PaymentButtons';

const Total = () => {
  return (
    <View style={styles.container}>
      <PaymentButtons />
    </View>
  );
};

export default Total;

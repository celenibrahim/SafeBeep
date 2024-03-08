import {Text, View} from 'react-native';
import React from 'react';
import styles from './Pay.styles';
import PaymentSelection from '../../../components/PaymentSelection';

const Pay = () => {
  return (
    <View style={styles.container}>
      <PaymentSelection />
    </View>
  );
};

export default Pay;

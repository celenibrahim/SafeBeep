import {View} from 'react-native';
import React from 'react';
import styles from './Pay.styles';
import PaymentButtons from '../../../components/PaymentButtons';

const Pay = () => {
  return (
    <View style={styles.container}>
      <PaymentButtons />
    </View>
  );
};

export default Pay;

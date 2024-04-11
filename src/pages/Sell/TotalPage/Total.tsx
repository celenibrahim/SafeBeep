import {View} from 'react-native';
import React from 'react';
import styles from './Total.styles';
import PaymentButtons from '../../../components/PaymentButtons';

const Total = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <PaymentButtons navigation={navigation} />
    </View>
  );
};

export default Total;

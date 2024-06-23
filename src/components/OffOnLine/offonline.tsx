import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useUser} from '../../context/UserContext';
import NetInfo from '@react-native-community/netinfo';
import {useTranslation} from 'react-i18next';

const OffOnline = () => {
  const {t} = useTranslation();
  const netInfo = NetInfo.useNetInfo();
  const {userInfo} = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.statusText}>
          {netInfo.isConnected ? t('status.online') : t('status.offline')}
        </Text>
        <View
          style={[
            styles.statusDot,
            {backgroundColor: netInfo.isConnected ? 'green' : 'red'},
          ]}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.userInfoText}>
          {userInfo ? `${t('id.cashier')}: ${userInfo.id.substring(0, 5)}` : ''}
        </Text>
        <Text style={styles.userInfoText}>
          {userInfo ? `${t('checkout.no')}: ${userInfo.checkoutNo}` : ''}
        </Text>
      </View>
    </View>
  );
};

export default OffOnline;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  userInfoText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

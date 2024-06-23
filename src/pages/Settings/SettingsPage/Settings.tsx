import React from 'react';
import SettingsButton from '../../../components/SettingsButtons';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useTranslation} from 'react-i18next';
import OffOnline from '../../../components/OffOnLine';
const Settings = ({navigation}: any) => {
  const {t}: any = useTranslation();
  function gotoOS() {
    navigation.navigate('OtherSettingsPage');
  }
  return (
    <View style={{flex: 1}}>
      <View style={styles.title_container}>
        <Text style={styles.title}>{t('settings')}</Text>
      </View>
      <SettingsButton
        onPress={null}
        title={t('set.ingenico')}
        bgColor="#4b71ec"
      />
      <SettingsButton
        onPress={null}
        title={t('sales.import')}
        bgColor="green"
      />
      <SettingsButton onPress={null} title={t('reins.conf')} bgColor="green" />
      <SettingsButton onPress={null} title={t('set.scale')} bgColor="#4b71ec" />
      <SettingsButton onPress={gotoOS} title={t('set.other')} bgColor="green" />
      <SettingsButton
        onPress={null}
        title={t('test.printer')}
        bgColor="#ff8b26"
      />
      <SettingsButton
        onPress={null}
        title={t('operations')}
        bgColor="#4b71ec"
      />
      <View style={styles.offOnlineContainer}>
        <OffOnline />
      </View>
    </View>
  );
};
export default Settings;
const styles = StyleSheet.create({
  title_container: {
    height: Dimensions.get('screen').height / 15,
    width: Dimensions.get('screen').width / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 30,
  },
  offOnlineContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

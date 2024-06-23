import React from 'react';
import ReportsButton from '../../components/ReportsButtons';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useTranslation} from 'react-i18next';
import OffOnline from '../../components/OffOnLine';

const Reports = ({navigation}: any) => {
  const {t}: any = useTranslation();

  return (
    <View style={{flex: 1}}>
      <View style={styles.title_container}>
        <Text style={styles.title}>{t('reports')}</Text>
      </View>
      <ReportsButton onPress={null} title={t('report.x')} bgColor="#fb3131" />
      <ReportsButton onPress={null} title={t('report.z')} bgColor="#fb3131" />
      <ReportsButton onPress={null} title={t('report.bank')} bgColor="green" />
      <ReportsButton onPress={null} title={t('report.IBB')} bgColor="green" />
      <ReportsButton
        onPress={null}
        title={t('report.hadiCash')}
        bgColor="#ff8b26"
      />
      <ReportsButton
        onPress={null}
        title={t('report.hadiStore')}
        bgColor="#ff8b26"
      />
      <ReportsButton
        onPress={null}
        title={t('report.hadiWeb')}
        bgColor="#ff8b26"
      />
      <ReportsButton
        onPress={null}
        title={t('report.hadiCredit')}
        bgColor="#ff8b26"
      />
      <View style={styles.offOnlineContainer}>
        <OffOnline />
      </View>
    </View>
  );
};

export default Reports;

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

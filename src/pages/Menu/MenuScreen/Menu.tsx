import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import MMCards from '../../../components/MMCards';
import {useTranslation} from 'react-i18next';
import OffOnLine from '../../../components/OffOnLine';

function Menu({navigation}: any) {
  const {t}: any = useTranslation();

  function goToSettings() {
    navigation.navigate('SettingsStack');
  }

  function goToSellStack() {
    navigation.navigate('SellStack');
  }

  function goToReports() {
    navigation.navigate('ReportsPage');
  }

  function goToPrices() {
    navigation.navigate('PricesPage');
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.scrollView}>
        <MMCards
          bgColor="#ea5570"
          title={t('sell')}
          onPress={goToSellStack}
          iconUrl={require('../../../assets/icons/sell.png')}
        />
        <MMCards
          bgColor="#ea5570"
          title={t('refund')}
          onPress={null}
          iconUrl={require('../../../assets/icons/refunds.png')}
        />
        <MMCards
          bgColor="#ea7c29"
          title={t('reports')}
          onPress={goToReports}
          iconUrl={require('../../../assets/icons/reports.png')}
        />
        <MMCards
          bgColor="#b10dc9"
          title={t('prdct.entry')}
          onPress={null}
          iconUrl={require('../../../assets/icons/productentry.png')}
        />
        <MMCards
          bgColor="#302eff"
          title={t('prices')}
          onPress={goToPrices}
          iconUrl={require('../../../assets/icons/prices.png')}
        />
        <MMCards
          bgColor="#ea5570"
          title={t('collection')}
          onPress={null}
          iconUrl={require('../../../assets/icons/collections.png')}
        />
        <MMCards
          bgColor="#29d9e9"
          title={t('others')}
          onPress={null}
          iconUrl={require('../../../assets/icons/others.png')}
        />
        <MMCards
          bgColor="#0bb1fa"
          title={t('web')}
          onPress={null}
          iconUrl={require('../../../assets/icons/website.png')}
        />
        <MMCards
          bgColor="#b6d5d8"
          title={t('settings')}
          onPress={goToSettings}
          iconUrl={require('../../../assets/icons/settings.png')}
        />
      </ScrollView>

      <View style={styles.offOnlineContainer}>
        <OffOnLine />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginBottom: 40,
  },
  offOnlineContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default Menu;

import React from 'react';
import {ScrollView, View} from 'react-native';
import MMCards from '../../../components/MMCards';

function Menu({navigation}: any) {
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
      <ScrollView>
        <MMCards
          bgColor="#ea5570"
          title="Sell"
          onPress={goToSellStack}
          iconUrl={require('../../../assets/icons/sell.png')}
        />
        <MMCards
          bgColor="#ea5570"
          title="Refund"
          onPress={null}
          iconUrl={require('../../../assets/icons/refunds.png')}
        />
        <MMCards
          bgColor="#ea7c29"
          title="Reports"
          onPress={goToReports}
          iconUrl={require('../../../assets/icons/reports.png')}
        />
        <MMCards
          bgColor="#b10dc9"
          title="Product Entry"
          onPress={null}
          iconUrl={require('../../../assets/icons/productentry.png')}
        />
        <MMCards
          bgColor="#302eff"
          title="Prices"
          onPress={goToPrices}
          iconUrl={require('../../../assets/icons/prices.png')}
        />
        <MMCards
          bgColor="#ea5570"
          title="Collections"
          onPress={null}
          iconUrl={require('../../../assets/icons/collections.png')}
        />
        <MMCards
          bgColor="#29d9e9"
          title="Others"
          onPress={null}
          iconUrl={require('../../../assets/icons/others.png')}
        />
        <MMCards
          bgColor="#0bb1fa"
          title="Website"
          onPress={null}
          iconUrl={require('../../../assets/icons/website.png')}
        />
        <MMCards
          bgColor="#b6d5d8"
          title="Settings"
          onPress={goToSettings}
          iconUrl={require('../../../assets/icons/settings.png')}
        />
      </ScrollView>
    </View>
  );
}
export default Menu;

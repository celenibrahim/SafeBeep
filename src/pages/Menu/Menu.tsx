import React from 'react';
import {ScrollView, View} from 'react-native';
import MMCards from '../../components/MMCards';

function Menu({navigation}: any) {
  function goToSettings() {
    navigation.navigate('SettingsPage');
  }
  function goToSellStack() {
    navigation.navigate('SellStack');
  }
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <MMCards
          title="Sell"
          onPress={goToSellStack}
          iconUrl={require('../../assets/icons/sell.png')}
        />
        <MMCards
          title="Refund"
          onPress={null}
          iconUrl={require('../../assets/icons/refunds.png')}
        />
        <MMCards
          title="Reports"
          onPress={null}
          iconUrl={require('../../assets/icons/reports.png')}
        />
        <MMCards
          title="Product Entry"
          onPress={null}
          iconUrl={require('../../assets/icons/productentry.png')}
        />
        <MMCards
          title="Prices"
          onPress={null}
          iconUrl={require('../../assets/icons/prices.png')}
        />
        <MMCards
          title="Collections"
          onPress={null}
          iconUrl={require('../../assets/icons/collections.png')}
        />
        <MMCards
          title="Others"
          onPress={null}
          iconUrl={require('../../assets/icons/others.png')}
        />
        <MMCards
          title="Website"
          onPress={null}
          iconUrl={require('../../assets/icons/website.png')}
        />
        <MMCards
          title="Settings"
          onPress={goToSettings}
          iconUrl={require('../../assets/icons/settings.png')}
        />
      </ScrollView>
    </View>
  );
}
export default Menu;

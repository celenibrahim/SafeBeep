import React from 'react';
import {ScrollView} from 'react-native';
import MMCards from '../../components/MMCards';

function Menu() {
  return (
    <ScrollView>
      <MMCards
        title="Sell"
        onPress={null}
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
    </ScrollView>
  );
}
export default Menu;

import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import SearchBar from '../../../components/SearchBar';
import CategoryCard from '../../../components/CategoryCard';

import Button from '../../../components/Button';

function SellScreen({navigation}: any) {
  function goToProducts() {
    navigation.navigate('Products');
  }
  return (
    <ScrollView style={styles.container}>
      <SearchBar placeholder="Type Product Code..." />
      <Button text={'All Products'} onPress={goToProducts} />
      <View style={{flexDirection: 'row', flex: 3}}>
        <CategoryCard
          Title="Market"
          onpress={null}
          imageUrl={require('../../../assets/images/market.png')}
        />
        <CategoryCard
          Title="Elektronik"
          onpress={null}
          imageUrl={require('../../../assets/images/electronic.png')}
        />
      </View>
      <View style={{flexDirection: 'row', flex: 3}}>
        <CategoryCard
          Title="Giyim"
          onpress={null}
          imageUrl={require('../../../assets/images/clothes.png')}
        />
        <CategoryCard
          Title="Aksesuar"
          onpress={null}
          imageUrl={require('../../../assets/images/accessories.png')}
        />
      </View>
      <View style={{flexDirection: 'row', flex: 3}}>
        <CategoryCard
          Title="Kitap & Kırtasiye"
          onpress={null}
          imageUrl={require('../../../assets/images/books.png')}
        />
        <CategoryCard
          Title="Temizlik"
          onpress={null}
          imageUrl={require('../../../assets/images/cleaning.png')}
        />
      </View>
    </ScrollView>
  );
}
export default SellScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 10,
  },
});

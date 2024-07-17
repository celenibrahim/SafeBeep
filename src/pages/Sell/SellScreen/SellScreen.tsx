import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import SearchBar from '../../../components/SearchBar';
import CategoryCard from '../../../components/CategoryCard';
import Button from '../../../components/Button';
import {useTranslation} from 'react-i18next';
import OffOnLine from '../../../components/OffOnLine';

function SellScreen({navigation}: any) {
  const {t} = useTranslation();

  function goToProducts(category: string | null) {
    navigation.navigate('Products', {category});
  }

  function goToFavorites() {
    navigation.navigate('FavPage');
  }

  return (
    <ScrollView style={styles.container}>
      <SearchBar placeholder={t('srch.code')} />

      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{flex: 1}}>
          <Button text={t('fav')} onPress={goToFavorites} />
        </View>
        <View style={{flex: 1}}>
          <Button text={t('prdct.all')} onPress={() => goToProducts(null)} />
        </View>
      </View>

      <View style={{flexDirection: 'row', flex: 3}}>
        <CategoryCard
          Title={t('market')}
          onpress={() => goToProducts('market')}
          imageUrl={require('../../../assets/images/market.jpg')}
        />
        <CategoryCard
          Title={t('electronic')}
          onpress={() => goToProducts('electronics')}
          imageUrl={require('../../../assets/images/electronic.jpg')}
        />
      </View>

      <View style={{flexDirection: 'row', flex: 3}}>
        <CategoryCard
          Title={t('clothing')}
          onpress={() => goToProducts('clothes')}
          imageUrl={require('../../../assets/images/clothes.jpg')}
        />
        <CategoryCard
          Title={t('accessories')}
          onpress={() => goToProducts('accessories')}
          imageUrl={require('../../../assets/images/accessories.jpg')}
        />
      </View>

      <View style={{flexDirection: 'row', flex: 3}}>
        <CategoryCard
          Title={t('book.stationery')}
          onpress={() => goToProducts('books')}
          imageUrl={require('../../../assets/images/books.jpg')}
        />
        <CategoryCard
          Title={t('cleaning')}
          onpress={() => goToProducts('cleaning')}
          imageUrl={require('../../../assets/images/cleaning.jpg')}
        />
      </View>
      <View style={styles.offOnlineContainer}>
        <OffOnLine />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  offOnlineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 165,
  },
});

export default SellScreen;

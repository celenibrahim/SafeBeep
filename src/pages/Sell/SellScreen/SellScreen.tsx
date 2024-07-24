import React from 'react';
import {View} from 'react-native';
import CategoryCard from '../../../components/CategoryCard';
import Button from '../../../components/Button';
import {useTranslation} from 'react-i18next';
import OffOnLine from '../../../components/OffOnLine';
import styles from './SellScreen.styles';
function SellScreen({navigation}: any) {
  const {t} = useTranslation();

  function goToProducts(category: string | null) {
    navigation.navigate('Products', {category});
  }

  function goToFavorites() {
    navigation.navigate('FavPage');
  }

  return (
    <View style={styles.container}>
      <View style={styles.button_container}>
        <View style={{flex: 1}}>
          <Button text={t('fav')} onPress={goToFavorites} />
        </View>
        <View style={{flex: 1}}>
          <Button text={t('prdct.all')} onPress={() => goToProducts(null)} />
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
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

      <View style={{flexDirection: 'row'}}>
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

      <View style={{flexDirection: 'row'}}>
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
    </View>
  );
}

export default SellScreen;

import React from 'react';
import {View, Text} from 'react-native';
import styles from './ProductCard.style';
import Button from '../Button';
import FavButton from '../FavButton';
import {useTranslation} from 'react-i18next';

const ProductCard = ({
  item,
  isFavorited,
  addToFavoritesPress,
  addToCartPress,
}: any) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={styles.title}>{item.product_name}</Text>
      </View>

      <View style={styles.info_container}>
        <View style={{flex: 1}}>
          <Text>
            {t('prdct.code')}: {item.id}
          </Text>
          <Text style={styles.price}>
            {t('price')}: {item.price}
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <FavButton onPress={addToFavoritesPress} isFavorited={isFavorited} />
          <Button text={t('add.cart')} onPress={addToCartPress} />
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

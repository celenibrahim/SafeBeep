import React from 'react';
import {View, Text} from 'react-native';
import styles from './ProductCard.style';
import Button from '../Button';
import FavButton from '../FavButton';
const ProductCard = (props: {
  item: {
    id: string | number;
    product_name: string;
    price: number;
  };
  addToCartPress: () => void;
  addToFavoritesPress: () => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={styles.title}>{props.item.product_name}</Text>
      </View>

      <View style={styles.info_container}>
        <View style={{flex: 1}}>
          <Text>Product Code : {props.item.id}</Text>
          <Text style={styles.price}>Price : {props.item.price}</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <FavButton
            iconUrl={require('../../assets/icons/favourite.png')}
            onPress={props.addToFavoritesPress}
          />
          <Button text={'Add to Cart'} onPress={props.addToCartPress} />
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

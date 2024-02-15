import React from 'react';
import {View, Text} from 'react-native';
import styles from './ProductCard.style';
import Button from '../Button';
const ProductCard = (props: {
  item: {
    id:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | null
      | undefined;
    product_name:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | null
      | undefined;
    price:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | null
      | undefined;
  };
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

        <View style={styles.button_container}>
          <Button text={'Add to Cart'} onPress={null} />
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

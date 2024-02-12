import React from 'react';
import {View, Text} from 'react-native';
import styles from './ProductCard.style';
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
      <Text>{props.item.id}</Text>
      <Text style={styles.title}>{props.item.product_name}</Text>
      <Text style={styles.price}>{props.item.price}</Text>
    </View>
  );
};

export default ProductCard;

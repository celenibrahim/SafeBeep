import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './Products.style';
import products_data from '../../../products-data.json';
import ProductCard from '../../../components/ProductCard';
function Products() {
  const renderProduct = ({item}: any) => <ProductCard item={item} />;

  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={products_data}
        renderItem={renderProduct}
      />
    </View>
  );
}
export default Products;

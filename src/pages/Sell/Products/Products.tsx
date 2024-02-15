import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import products_data from '../../../products-data.json';
import ProductCard from '../../../components/ProductCard';
function Products() {
  const renderProduct = ({item}: any) => <ProductCard item={item} />;
  const renderSeperator = () => <View style={styles.seperator} />;
  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={products_data}
        renderItem={renderProduct}
        ItemSeparatorComponent={renderSeperator}
      />
    </View>
  );
}
export default Products;

const styles = StyleSheet.create({
  container: {flex: 1},
  seperator: {
    borderWidth: 1,
    color: '#e0e0e0',
  },
});

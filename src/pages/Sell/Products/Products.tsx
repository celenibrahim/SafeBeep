import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
//data
import products_data from '../../../products-data.json';
//components
import ProductCard from '../../../components/ProductCard';
import SearchBar from '../../../components/SearchBar';
import IconButton from '../../../components/IconButton';

function Products() {
  const [list, setList] = useState(products_data);
  const renderProduct = ({item}: any) => <ProductCard item={item} />;
  const renderSeperator = () => <View style={styles.seperator} />;

  const handleSearch = (text: any) => {
    const filteredList = products_data.filter(product => {
      const searchedText = text.toLowerCase();
      const currentTitle = product.product_name.toLowerCase();

      return currentTitle.indexOf(searchedText) > -1;
    });
    setList(filteredList);
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <SearchBar
            placeholder="write the name of the product you want to search for"
            onChangeText={handleSearch}
          />
        </View>
        <View style={{margin: 4}}>
          <IconButton iconUrl={require('../../../assets/icons/filter.png')} />
        </View>
      </View>
      <FlatList
        keyExtractor={item => item.id}
        data={list}
        renderItem={renderProduct}
        ItemSeparatorComponent={renderSeperator} //to make border
      />
    </View>
  );
}
export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  seperator: {
    borderWidth: 1,
    color: '#e0e0e0',
  },
});

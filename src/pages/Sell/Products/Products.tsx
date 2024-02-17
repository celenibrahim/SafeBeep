import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
//data
import products_data from '../../../products-data.json';
//components
import ProductCard from '../../../components/ProductCard';
import SearchBar from '../../../components/SearchBar';
import SortButton from '../../../components/SortButton';

function Products() {
  const [list, setList] = useState(products_data);
  const renderProduct = ({item}: any) => <ProductCard item={item} />;
  const renderSeperator = () => <View style={styles.seperator} />;

  const sortByPriceAscending = () => {
    const sortedData = [...list].sort((a, b) => a.price - b.price);
    setList(sortedData);
  };
  const sortByPriceDescending = () => {
    const sortedData = [...list].sort((a, b) => b.price - a.price);
    setList(sortedData);
  };
  const sortByAlphabeticalOrder = () => {
    const sortedData = [...list].sort((a, b) =>
      a.product_name.localeCompare(b.product_name),
    );
    setList(sortedData);
  };
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
          <SortButton
            onpress={sortByPriceAscending}
            onpressB={sortByPriceDescending}
            onpressC={sortByAlphabeticalOrder}
            iconUrl={require('../../../assets/icons/sort.png')}
          />
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

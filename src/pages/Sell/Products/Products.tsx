import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
//data
import products_data from '../../../products-data.json';
//components
import ProductCard from '../../../components/ProductCard';
import SearchBar from '../../../components/SearchBar';
import SortButton from '../../../components/SortButton';
import CartButton from '../../../components/CartButton';
function Products({navigation}: any) {
  function goToCart() {
    navigation.navigate('CartPage');
  }
  const [list, setList] = useState(products_data);
  const renderProduct = ({item}: any) => (
    <ProductCard
      item={item}
      addToCartPress={() => handleAddToCart(item.id)}
      addToFavoritesPress={() => handleAddToFavorites(item.id)}
    />
  );
  const renderSeperator = () => <View style={styles.seperator} />;
  const handleAddToCart = (productId: string) => {
    console.log('Ürün (' + productId + ') sepete eklendi!');
  };

  const handleAddToFavorites = (productId: string) => {
    console.log('Ürün (' + productId + ') favorilere eklendi!');
  };
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
  const handleSearch = (text: string) => {
    const searchedText = text.toLowerCase();
    const filteredList = products_data.filter(product => {
      const currentTitle = product.product_name.toLowerCase();
      return currentTitle.startsWith(searchedText);
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
        <View style={{margin: 2, flexDirection: 'row'}}>
          <SortButton
            onpress={sortByPriceAscending}
            onpressB={sortByPriceDescending}
            onpressC={sortByAlphabeticalOrder}
            iconUrl={require('../../../assets/icons/sort.png')}
          />
          <CartButton
            onpress={goToCart}
            iconUrl={require('../../../assets/icons/sell.png')}
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

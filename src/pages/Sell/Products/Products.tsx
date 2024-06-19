import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../../../components/ProductCard';
import SearchBar from '../../../components/SearchBar';
import SortButton from '../../../components/SortButton';
import CartButton from '../../../components/CartButton';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

function Products({navigation}: any) {
  interface Product {
    id: string;
    product_name: string;
    price: number;
    category: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const {t}: any = useTranslation();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.56.1:3001/products');
      setProducts(response.data);
      setOriginalProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetProducts = () => {
    setProducts(originalProducts);
  };

  function goToCart() {
    navigation.navigate('CartPage');
  }

  const renderProduct = ({item}: any) => (
    <ProductCard
      item={item}
      addToCartPress={() => handleAddToCart(item.id)}
      addToFavoritesPress={() => handleAddToFavorites(item.id)}
    />
  );

  const renderSeperator = () => <View style={styles.seperator} />;

  const handleAddToCart = async (productId: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@cart');
      let cart: Product[] = jsonValue != null ? JSON.parse(jsonValue) : [];
      const productToAdd = originalProducts.find(
        product => product.id === productId,
      );
      if (productToAdd) {
        cart.push(productToAdd);
        await AsyncStorage.setItem('@cart', JSON.stringify(cart));
        console.log('Ürün (' + productToAdd.product_name + ') sepete eklendi!');
        console.log('Updated Cart:', cart);
      } else {
        console.error('Ürün bulunamadı: ' + productId);
      }
    } catch (e) {
      console.error('Error adding product to cart:', e);
    }
  };

  const handleAddToFavorites = async (productId: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorites');
      let favorites = jsonValue != null ? JSON.parse(jsonValue) : [];
      const newFavorites = [...favorites, productId];
      await AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites));
      console.log('Ürün (' + productId + ') favorilere eklendi!');
    } catch (e) {
      console.error('Error adding product to favorites:', e);
    }
  };

  const sortByPriceAscending = () => {
    const sortedData = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedData);
  };

  const sortByPriceDescending = () => {
    const sortedData = [...products].sort((a, b) => b.price - a.price);
    setProducts(sortedData);
  };

  const sortByAlphabeticalOrder = () => {
    const sortedData = [...products].sort((a, b) =>
      t(a.product_name).localeCompare(t(b.product_name)),
    );
    setProducts(sortedData);
  };

  const sortFavoriteProducts = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorites');
      const favoriteProductsIds =
        jsonValue != null ? JSON.parse(jsonValue) : [];
      const favoriteProducts = products.filter(product =>
        favoriteProductsIds.includes(product.id),
      );
      setProducts(favoriteProducts);
    } catch (error) {
      console.error('Error sorting favorite products:', error);
    }
  };

  const handleSearch = (text: string) => {
    const searchedText = text.toLowerCase();
    const filteredList = originalProducts.filter(product => {
      const currentTitle = t(product.product_name).toLowerCase();
      return currentTitle.startsWith(searchedText);
    });
    setProducts(filteredList);
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <SearchBar placeholder={t('srch')} onChangeText={handleSearch} />
        </View>
        <View style={{margin: 2, flexDirection: 'row'}}>
          <SortButton
            onpress={sortByPriceAscending}
            onpressB={sortByPriceDescending}
            onpressC={sortByAlphabeticalOrder}
            onPressD={sortFavoriteProducts}
            onPressE={resetProducts}
            iconUrl={require('../../../assets/icons/sort.png')}
          />
          <CartButton
            onpress={goToCart}
            iconUrl={require('../../../assets/icons/sell.png')}
          />
        </View>
      </View>
      <FlatList
        keyExtractor={products => products.id.toString()}
        data={products}
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

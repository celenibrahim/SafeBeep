import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../../../components/ProductCard';
import SearchBar from '../../../components/SearchBar';
import SortButton from '../../../components/SortButton';
import CartButton from '../../../components/CartButton';
import productsData from '../../../products-data.json';
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setProducts(productsData);
      setOriginalProducts(productsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

  const renderSeparator = () => <View style={styles.separator} />;

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
      a.product_name.localeCompare(b.product_name),
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
      const currentTitle = product.product_name.toLowerCase();
      const currentId = product.id.toLowerCase();
      return (
        currentTitle.startsWith(searchedText) ||
        currentId.startsWith(searchedText)
      );
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
        keyExtractor={product => product.id.toString()}
        data={products}
        renderItem={renderProduct}
        ItemSeparatorComponent={renderSeparator}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
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
  separator: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});

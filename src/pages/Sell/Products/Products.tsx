import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../../../components/ProductCard';
import SearchBar from '../../../components/SearchBar';
import SortButton from '../../../components/SortButton';
import CartButton from '../../../components/CartButton';
import productsData from '../../../products-data.json';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-root-toast';
import OffOnLine from '../../../components/OffOnLine';
import styles from './Products.styles';

function Products({navigation, route}: any) {
  const {category} = route.params || {};
  interface Product {
    id: string;
    product_name: string;
    price: number;
    category: string;
  }
  const [favorites, setFavorites] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const {t} = useTranslation();

  useEffect(() => {
    fetchData();
    fetchFavorites();
  }, []);

  useEffect(() => {
    if (category) {
      filterProductsByCategory(category);
    } else {
      setProducts(originalProducts);
    }
  }, [category, originalProducts]);

  const fetchFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorites');
      const favoritesArray = jsonValue != null ? JSON.parse(jsonValue) : [];
      setFavorites(favoritesArray);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const fetchData = async () => {
    try {
      setProducts(productsData);
      setOriginalProducts(productsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterProductsByCategory = (category: string) => {
    const filteredProducts = originalProducts.filter(
      product => product.category === category,
    );
    setProducts(filteredProducts);
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
      isFavorited={favorites.includes(item.id)}
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
        Toast.show(t('mes.cart'), {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
        //console.log('Ürün (' + productToAdd.product_name + ') sepete eklendi!');
        //console.log('Updated Cart:', cart);
      } else {
        console.error('Ürün bulunamadı: ' + productId);
      }
    } catch (e) {
      console.error('Error adding product to cart:', e);
    }
  };

  const handleAddToFavorites = async (productId: string) => {
    try {
      const favorites = await AsyncStorage.getItem('@favorites');
      let favoritesArray = favorites ? JSON.parse(favorites) : [];

      const isCurrentlyFavorited = favoritesArray.includes(productId);

      if (isCurrentlyFavorited) {
        const index = favoritesArray.indexOf(productId);
        if (index > -1) {
          favoritesArray.splice(index, 1);
          Toast.show(t('mes.fav.del'), {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
          });
        }
      } else {
        favoritesArray.push(productId);
        Toast.show(t('mes.fav'), {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      }

      await AsyncStorage.setItem('@favorites', JSON.stringify(favoritesArray));
    } catch (error) {
      console.error('Error toggling favorites:', error);
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
      <View style={styles.product_con}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.searchbar_con}>
            <SearchBar placeholder={t('srch')} onChangeText={handleSearch} />
          </View>
          <View style={styles.but_con}>
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
      <View style={styles.offOnlineContainer}>
        <OffOnLine />
      </View>
    </View>
  );
}
export default Products;

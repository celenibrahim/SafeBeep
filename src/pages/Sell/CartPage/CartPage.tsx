import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from './../../../components/CartCard'; // CartItem component'ını import edin
import productsData from '../../../products-data.json'; // productsData'yı import edin
import styles from './CartPage.style';
interface Product {
  id: string;
  product_name: string;
  price: number;
  category: string;
}
const CartPage = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartData = await AsyncStorage.getItem('@cart');
        if (cartData !== null) {
          const parsedCart: string[] = JSON.parse(cartData);
          setCartItems(parsedCart);
        }
        const favoritesData = await AsyncStorage.getItem('@favorites');
        if (favoritesData !== null) {
          const parsedFavorites: string[] = JSON.parse(favoritesData);
          setFavoriteItems(parsedFavorites);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const findProductInfo = (id: string): string => {
    const product = productsData.find((item: Product) => item.id === id);
    return product ? `${product.product_name}` : '';
  };

  const countItems = (items: string[]): Record<string, number> => {
    const itemCounts: Record<string, number> = {};
    items.forEach((id: string) => {
      itemCounts[id] = (itemCounts[id] || 0) + 1;
    });
    return itemCounts;
  };

  const increaseQuantity = async (id: string) => {
    const updatedCartItems = [...cartItems, id];
    setCartItems(updatedCartItems);
    await AsyncStorage.setItem('@cart', JSON.stringify(updatedCartItems));
  };

  const decreaseQuantity = async (id: string) => {
    const updatedCartItems = [...cartItems];
    const index = updatedCartItems.indexOf(id);
    if (index > -1) {
      updatedCartItems.splice(index, 1);
      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('@cart', JSON.stringify(updatedCartItems));
    }
  };

  const removeFromCart = async (id: string) => {
    const updatedCartItems = cartItems.filter(item => item !== id);
    setCartItems(updatedCartItems);
    await AsyncStorage.setItem('@cart', JSON.stringify(updatedCartItems));
  };
  const calculateTotalPrice = (): number => {
    let totalPrice = 0;
    cartItems.forEach(id => {
      const product = productsData.find(item => item.id === id);
      if (product) {
        totalPrice += product.price;
      }
    });
    return totalPrice;
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.cartItemsContainer}>
            {Object.entries(countItems(cartItems)).map(([id, count], index) => (
              <CartItem
                key={'cart_' + index}
                productName={findProductInfo(id)}
                price={
                  productsData.find((item: Product) => item.id === id)?.price ||
                  0
                }
                quantity={count}
                onIncrease={() => increaseQuantity(id)}
                onDecrease={() => decreaseQuantity(id)}
                onRemove={() => removeFromCart(id)}
              />
            ))}
          </View>
          <View style={styles.favoriteItemsContainer}>
            <Text style={styles.sectionTitle}>Favorite Items:</Text>
            {Object.entries(countItems(favoriteItems)).map(([id], index) => (
              <Text key={'favorite_' + index} style={styles.favoriteItem}>
                {findProductInfo(id)}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottom_container}>
        <View style={styles.bottom_inner}>
          <Text style={styles.bc_text}>
            Total Price: {calculateTotalPrice()} $
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.bottom_button}>
              <Text style={styles.bc_text}>Pay</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartPage;
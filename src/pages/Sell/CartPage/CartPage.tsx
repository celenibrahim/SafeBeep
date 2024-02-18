import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@cart');
        const cartData = jsonValue != null ? JSON.parse(jsonValue) : [];
        setCartItems(cartData);
      } catch (e) {
        console.error('Error getting cart items:', e);
      }
    };

    const getFavoriteItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@favorites');
        const favoriteData = jsonValue != null ? JSON.parse(jsonValue) : [];
        setFavoriteItems(favoriteData);
      } catch (e) {
        console.error('Error getting favorite items:', e);
      }
    };

    getCartItems();
    getFavoriteItems();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CartPage</Text>
      <View style={styles.cartItemsContainer}>
        <Text style={styles.sectionTitle}>Cart Items:</Text>
        {cartItems.map((item, index) => (
          <Text key={'cart_' + index} style={styles.cartItem}>
            {item}
          </Text>
        ))}
      </View>
      <View style={styles.favoriteItemsContainer}>
        <Text style={styles.sectionTitle}>Favorite Items:</Text>
        {favoriteItems.map((item, index) => (
          <Text key={'favorite_' + index} style={styles.favoriteItem}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItemsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  favoriteItemsContainer: {
    alignItems: 'center',
  },
  cartItem: {
    fontSize: 18,
    marginBottom: 5,
  },
  favoriteItem: {
    fontSize: 18,
    color: 'green',
    marginBottom: 5,
  },
});

import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from './../../../components/CartCard';
import styles from './CartPage.style';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import {useCart} from '../../../context/CartContext';

interface Product {
  id: string;
  product_name: string;
  price: number;
  category: string;
}

const categoryTaxRates: {[key: string]: number} = {
  market: 2,
  clothes: 5,
  accessories: 7,
  electronics: 4,
  books: 1,
  cleaning: 3,
};

const CartPage = ({navigation}: any) => {
  const {t}: any = useTranslation();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {subtotal, setSubtotal, totalPrice, setTotalPrice} = useCart();

  const fetchData = async () => {
    try {
      const cartData = await AsyncStorage.getItem('@cart');
      if (cartData !== null) {
        const parsedCart: Product[] = JSON.parse(cartData);
        setCartItems(parsedCart);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const subtotal = subTotalPrice();
    const total = calculateTotalPrice();
    setSubtotal(subtotal);
    setTotalPrice(total);
  }, [cartItems]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  function goToTotal() {
    navigation.navigate('TotalPage');
  }

  const countItems = (items: Product[]): Record<string, number> => {
    const itemCounts: Record<string, number> = {};
    items.forEach((item: Product) => {
      itemCounts[item.id] = (itemCounts[item.id] || 0) + 1;
    });
    return itemCounts;
  };

  const increaseQuantity = async (id: string) => {
    const updatedCartItems = [
      ...cartItems,
      cartItems.find(item => item.id === id)!,
    ];
    setCartItems(updatedCartItems);
    await AsyncStorage.setItem('@cart', JSON.stringify(updatedCartItems));
  };

  const decreaseQuantity = async (id: string) => {
    const updatedCartItems = [...cartItems];
    const index = updatedCartItems.findIndex(item => item.id === id);
    if (index > -1) {
      updatedCartItems.splice(index, 1);
      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('@cart', JSON.stringify(updatedCartItems));
    }
  };

  const removeFromCart = async (id: string) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    await AsyncStorage.setItem('@cart', JSON.stringify(updatedCartItems));
  };

  const calculateTotalPrice = (): number => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      const taxRate = categoryTaxRates[item.category] || 0;
      const totalProductPrice = item.price * (1 + taxRate / 100);
      totalPrice += totalProductPrice;
    });
    return totalPrice;
  };

  const subTotalPrice = (): number => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price;
    });
    return totalPrice;
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView style={{flex: 1}}>
          {cartItems.length === 0 ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.emptyText}>{t('cart.empty')}</Text>
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.cartItemsContainer}>
                {Object.entries(countItems(cartItems)).map(
                  ([id, count], index) => (
                    <CartItem
                      key={'cart_' + index}
                      productName={
                        cartItems.find(item => item.id === id)?.product_name ||
                        ''
                      }
                      price={cartItems.find(item => item.id === id)?.price || 0}
                      quantity={count}
                      onIncrease={() => increaseQuantity(id)}
                      onDecrease={() => decreaseQuantity(id)}
                      onRemove={() => removeFromCart(id)}
                      taxRate={
                        categoryTaxRates[
                          cartItems.find(item => item.id === id)?.category || ''
                        ] || 0
                      }
                    />
                  ),
                )}
              </View>
            </View>
          )}
        </ScrollView>
      )}
      <View style={styles.bottom_container}>
        <View style={styles.bottom_inner}>
          <Text style={styles.bc_text}>
            {t('total.sub')} : {subTotalPrice().toFixed(2)} $
          </Text>
          <Text style={styles.bc_text}>
            {t('total.price')} : {calculateTotalPrice().toFixed(2)} $
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={goToTotal}
            disabled={cartItems.length === 0}>
            <View
              style={[
                styles.bottom_button,
                cartItems.length === 0 && {opacity: 0.5},
              ]}>
              <Text style={styles.bc_text}>{t('t/p')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartPage;

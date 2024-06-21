import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useCart} from '../../context/CartContext';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Receipt = () => {
  const {t}: any = useTranslation();
  const {totalPrice, change} = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  interface CartItem {
    id: string;
    price: number;
    product_name: string;
    quantity: number; // ürün miktarını tutmak için
  }

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('@cart');
        if (storedCartItems) {
          const parsedItems: CartItem[] = JSON.parse(storedCartItems);
          // Ürünleri gruplamak için bir obje oluştur
          const groupedItems: {[key: string]: CartItem} = {};

          parsedItems.forEach(item => {
            if (groupedItems[item.id]) {
              groupedItems[item.id].quantity += 1; // Ürün zaten varsa miktarını artır
            } else {
              groupedItems[item.id] = {...item, quantity: 1}; // Yeni ürünü ekle
            }
          });

          // Gruplanmış ürünleri state'e ayarla
          setCartItems(Object.values(groupedItems));
        }
      } catch (error) {
        console.error(
          "AsyncStorage'den sepet öğeleri yüklenirken hata oluştu",
          error,
        );
      }
    };

    fetchCartItems();
  }, []);

  const formattedDate = new Date().toLocaleString();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('receipt')}</Text>
      <Text style={styles.date}>{formattedDate}</Text>

      <ScrollView style={styles.scrollContainer}>
        {cartItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemText}>
              {t(item.product_name)} - {item.quantity} {t('pieces')} -{' '}
              {item.price * item.quantity} $
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          {t('total.price')}: {totalPrice ? totalPrice.toFixed(2) : '0.00'} $
        </Text>
        <Text style={styles.summaryText}>
          {t('totalPaid')}:{' '}
          {totalPrice && change !== undefined
            ? (totalPrice + change).toFixed(2)
            : '0.00'}{' '}
          $
        </Text>
        <Text style={styles.summaryText}>
          {t('change')}: {change !== undefined ? change.toFixed(2) : '0.00'} $
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  date: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  summaryContainer: {
    paddingVertical: 20,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Receipt;

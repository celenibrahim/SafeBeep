import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useCart} from '../../context/CartContext';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {encode} from 'base-64';
import Button from '../../components/Button';
const Receipt = () => {
  const {t}: any = useTranslation();
  const {totalPrice, change} = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  interface CartItem {
    id: string;
    price: number;
    product_name: string;
    quantity: number;
  }
  const setEmailing = () => {
    setEmailModalVisible(true);
  };
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('@cart');
        if (storedCartItems) {
          const parsedItems: CartItem[] = JSON.parse(storedCartItems);

          const groupedItems: {[key: string]: CartItem} = {};

          parsedItems.forEach(item => {
            if (groupedItems[item.id]) {
              groupedItems[item.id].quantity += 1;
            } else {
              groupedItems[item.id] = {...item, quantity: 1};
            }
          });

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
  const handleSendEmail = async () => {
    const MAILJET_API_KEY = 'f8d1003d0c4762100cc0c9e380602c75';
    const MAILJET_SECRET_KEY = '384cf9729a3d9cb4e2e357246c427205';
    const MAILJET_API_URL = 'https://api.mailjet.com/v3.1/send';
    const credentials = `${MAILJET_API_KEY}:${MAILJET_SECRET_KEY}`;
    const encodedCredentials = encode(credentials);

    const emailData = {
      Messages: [
        {
          From: {
            Email: 'safebeep@mailjet.com',
            Name: 'Safe Beep Customer Service',
          },
          To: [
            {
              Email: email,
              Name: 'User',
            },
          ],
          Subject: 'Your Receipt',
          TextPart: 'Thank you for your purchase!',
        },
      ],
    };

    try {
      const response = await fetch(MAILJET_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('receipt')}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={emailModalVisible}
        onRequestClose={() => setEmailModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{t('enter.mail')}</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#0098d9'}]}
              onPress={handleSendEmail}>
              <Text style={styles.text_button}>{t('send.mail')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'red'}]}
              onPress={() => setEmailModalVisible(false)}>
              <Text style={styles.text_button}>{t('cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
        <Button text={t('send.mail')} onPress={setEmailing} />
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  text_button: {
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    margin: 2,
    borderWidth: 1,
    borderRadius: 10,
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').height / 11.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkblue',
  },
});

export default Receipt;

import React, {useState, useEffect} from 'react';
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
import styles from './Receipt.syles';
import {useUser} from '../../context/UserContext'; // UserContext'den useUser hook'u eklendi

const Receipt = ({navigation}: any) => {
  const {t}: any = useTranslation();
  const {totalPrice, change} = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const {userInfo}: any = useUser(); // userInfo global state'ten alındı

  interface CartItem {
    id: string;
    price: number;
    product_name: string;
    quantity: number;
  }

  const setEmailing = () => {
    setEmailModalVisible(true);
  };

  const goToMenu = () => {
    navigation.navigate('MenuStack');
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
      <Text style={styles.userInfoText}>
        {userInfo ? `${t('id.cashier')}: ${userInfo.id}` : ''}
      </Text>
      <Text style={styles.userInfoText}>
        {userInfo ? `${t('checkout.no')}: ${userInfo.checkoutNo}` : ''}
      </Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={emailModalVisible}
        onRequestClose={() => setEmailModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.emailModalView}>
            <Text style={styles.emailModalText}>{t('enter.mail')}</Text>
            <TextInput
              style={styles.emailInput}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={[styles.emailModalButton, {backgroundColor: '#007AFF'}]}
              onPress={handleSendEmail}>
              <Text style={styles.text_button}>{t('send')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.emailModalButton, {backgroundColor: '#FF3B30'}]}
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
              {item.product_name} - {item.quantity} {t('pieces')} -{' '}
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
      <Button text={t('send.mail')} onPress={setEmailing} />
      <Button text={t('finish')} onPress={goToMenu} />
    </View>
  );
};

export default Receipt;

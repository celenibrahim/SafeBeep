import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
  Alert,
  Vibration,
} from 'react-native';
import {useCart} from '../../context/CartContext';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {encode} from 'base-64';
import styles from './Receipt.syles';
import {useUser} from '../../context/UserContext';
import NetInfo from '@react-native-community/netinfo';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
const Receipt = ({navigation}: any) => {
  const ONE_SECOND_IN_MS = 1000;
  const {t}: any = useTranslation();
  const {totalPrice, change} = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const {userInfo}: any = useUser();
  const [isOnline, setIsOnline] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
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
    Vibration.vibrate(1 * ONE_SECOND_IN_MS);
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

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected !== null) {
        setIsOnline(state.isConnected);
      }
    });

    return () => unsubscribe();
  }, []);

  const formattedDate = new Date().toLocaleString();

  const fetchWithTimeout = (
    url: string,
    options: RequestInit,
    timeout = 3000,
  ): Promise<Response> => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Request timed out'));
      }, timeout);

      fetch(url, options)
        .then(response => {
          clearTimeout(timer);
          resolve(response);
        })
        .catch(err => {
          clearTimeout(timer);
          reject(err);
        });
    });
  };

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
  const getUniqueFileName = async (): Promise<string> => {
    let fileIndex = 1;
    let filePath = `${RNFS.DocumentDirectoryPath}/Receipt_${fileIndex}.pdf`;

    while (await RNFS.exists(filePath)) {
      fileIndex++;
      filePath = `${RNFS.DocumentDirectoryPath}/Receipt_${fileIndex}.pdf`;
    }

    return filePath;
  };

  const handleFinish = async () => {
    const sale = {
      userId: userInfo.id,
      checkoutNo: userInfo.checkoutNo,
      date: formattedDate,
      items: cartItems,
      totalPaid: totalPrice + change,
      totalPrice: totalPrice ? totalPrice.toFixed(2) : '0.00',
      change: change ? change.toFixed(2) : '0.00',
    };
    const htmlContent = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          margin: 20px;
        }
        h1, h2, h3 {
          margin: 10px 0;
        }
        p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <h1>${t('receipt')}</h1>
      <p>${formattedDate}</p>
      <p>${t('id.cashier')}: ${userInfo.id}</p>
      <p>${t('checkout')}: ${userInfo.checkoutNo}</p>
      <h2>${t('items')}</h2>
      ${cartItems
        .map(
          item => `
        <p>${item.product_name} - ${item.quantity} ${t('pieces')} - ${(
            item.price * item.quantity
          ).toFixed(2)} $</p>
      `,
        )
        .join('')}
      <h3>${t('total.price')}: ${totalPrice.toFixed(2)} $</h3>
      <h3>${t('totalPaid')}: ${(totalPrice + change).toFixed(2)} $</h3>
      <h3>${t('change')}: ${change.toFixed(2)} $</h3>
    </body>
  </html>
`;
    const uniqueFilePath: string = await getUniqueFileName();
    const options = {
      html: htmlContent,
      fileName: uniqueFilePath.split('/').pop()?.split('.')[0] || 'Receipt',
      directory: 'Documents',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      console.log('PDF created at: ', file.filePath);
      const destinationPath = `${RNFS.DownloadDirectoryPath}/Receipt.pdf`;
      await RNFS.moveFile(file.filePath, destinationPath);
    } catch (error) {
      console.error('Error creating PDF: ', error);
    }
    let storageKey = 'offsales';
    let isOnlineSuccess = false;

    setButtonDisabled(true);

    try {
      if (isOnline) {
        try {
          const response = await fetchWithTimeout(
            'http://192.168.56.1:3001/sales',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(sale),
            },
          );

          if (response.ok) {
            const responseData = await response.json();
            console.log('Response message:', responseData.message);
            storageKey = 'onsales';
            isOnlineSuccess = true;
          } else {
            throw new Error('Failed to save sale to the server');
          }
        } catch (error) {
          console.error('Error posting sale:', error);
        }
      }

      const storedSales = await AsyncStorage.getItem(storageKey);
      const sales = storedSales ? JSON.parse(storedSales) : [];
      sales.push(sale);
      await AsyncStorage.setItem(storageKey, JSON.stringify(sales));
      await AsyncStorage.removeItem('@cart');

      if (!isOnlineSuccess && isOnline) {
        Alert.alert(t('alert.warning'), t('err.server'));
      } else {
        Alert.alert(t('alert.warning'), t('sale.saved'));
      }

      goToMenu();
    } catch (error) {
      console.error('Error saving sale:', error);
      Alert.alert(t('alert.warning'), t('error.saleSave'));
    } finally {
      setButtonDisabled(false);
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
        {userInfo ? `${t('checkout')}: ${userInfo.checkoutNo}` : ''}
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
              <Text style={styles.buttonText}>{t('send')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.emailModalButton, {backgroundColor: '#FF3B30'}]}
              onPress={() => setEmailModalVisible(false)}>
              <Text style={styles.buttonText}>{t('cancel')}</Text>
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
          {t('total.price')}: {totalPrice.toFixed(2)} $
        </Text>
        <Text style={styles.summaryText}>
          {t('totalPaid')}: {(totalPrice + change).toFixed(2)} $
        </Text>
        <Text style={styles.summaryText}>
          {t('change')}: {change.toFixed(2)} $
        </Text>
      </View>

      <TouchableOpacity style={styles.emailButton} onPress={setEmailing}>
        <Text style={styles.buttonText}>{t('send.mail')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={buttonDisabled ? styles.disabledButton : styles.finishButton}
        onPress={!buttonDisabled ? handleFinish : undefined}
        activeOpacity={buttonDisabled ? 1 : 0.7}
        disabled={buttonDisabled}>
        <Text style={styles.buttonText}>{t('finish')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Receipt;

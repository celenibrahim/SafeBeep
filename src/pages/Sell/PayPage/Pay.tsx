import {
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import styles from './Pay.styles';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCart} from '../../../context/CartContext'; //useCart hook

const Pay = ({navigation}: any) => {
  const {t}: any = useTranslation();
  const [input, setInput] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const {subtotal, totalPrice} = useCart();
  const [groupedCartItems, setGroupedCartItems] = useState<GroupedCartItem[]>(
    [],
  );
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null,
  );

  interface CartItem {
    id: string;
    price: number;
    product_name: string;
  }

  interface GroupedCartItem {
    product_name: string;
    price: number;
    quantity: number;
  }

  const handleInput = (value: any) => {
    setInput(input + value);
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('@cart');
        if (storedCartItems) {
          const parsedItems = JSON.parse(storedCartItems);
          console.log('Stored Cart Items:', storedCartItems);
          console.log('Parsed Cart Items:', parsedItems);
          setCartItems(parsedItems);
          groupCartItems(parsedItems);
        }
      } catch (error) {
        console.error('Failed to load cart items from AsyncStorage', error);
      }
    };

    fetchCartItems();
  }, []);

  const groupCartItems = (items: CartItem[]) => {
    const groupedItems: {[key: string]: GroupedCartItem} = {};

    items.forEach(item => {
      if (groupedItems[item.product_name]) {
        groupedItems[item.product_name].quantity += 1;
      } else {
        groupedItems[item.product_name] = {
          product_name: item.product_name,
          price: item.price,
          quantity: 1,
        };
      }
    });

    setGroupedCartItems(Object.values(groupedItems));
  };

  const cancelDocument = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('@cart');
      if (!storedCartItems || JSON.parse(storedCartItems).length === 0) {
        Alert.alert(t('empty.cart.alert'));
        return;
      }
      await AsyncStorage.removeItem('@cart');
      setCartItems([]);
      setGroupedCartItems([]);
      Alert.alert(t('cancel.doc.alert'));
    } catch (error) {
      console.error(t('cancel.doc.error'), error);
      Alert.alert(t('cancel.doc.error'));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.optContainer}>
        <TouchableOpacity
          style={[styles.optButtons, {backgroundColor: 'red'}]}
          onPress={cancelDocument}>
          <Text style={styles.text_button}>{t('cancel.doc')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optButtons, {backgroundColor: '#ffa200'}]}>
          <Text style={styles.text_button}>{t('finish.doc')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optContainer}>
        <TouchableOpacity style={[styles.optButtons, {backgroundColor: 'red'}]}>
          <Text style={styles.text_button}>{t('del')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optButtons, {backgroundColor: '#0098d9'}]}>
          <Text style={styles.text_button}>{t('hadi.wallet')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optContainer}>
        <TouchableOpacity
          style={[styles.optButtons, {backgroundColor: '#0098d9'}]}>
          <Text style={styles.text_button}>TomBank</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optButtons, {backgroundColor: '#15b82e'}]}>
          <Text style={styles.text_button}>{t('giftC')}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.inputContainer}>
          <ScrollView>
            {groupedCartItems.length > 0 ? (
              groupedCartItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedItemIndex(index)}>
                  <View
                    style={[
                      styles.cart_container,
                      selectedItemIndex === index && styles.selected_item,
                    ]}>
                    <Text style={styles.total_text} selectable={true}>
                      {t(item.product_name)} ({item.quantity}) -{' '}
                      {item.price * item.quantity} $
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text>{t('empty.cart')}</Text>
            )}
            <View style={styles.cart_container}>
              <Text style={styles.total_text}>{subtotal.toFixed(2)} $</Text>
              <Text style={styles.total_text}>{totalPrice.toFixed(2)} $</Text>
            </View>
          </ScrollView>
        </View>
        <View style={{flexDirection: 'row', flex: 1, margin: 5}}>
          <View style={styles.buttonContainer}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.bot_top_buttons}
                onPress={() => handleInput('00')}>
                <Text style={styles.text_button}>00</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('000')}>
                <Text style={styles.text_button}>000</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('1')}>
                <Text style={styles.text_button}>1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('2')}>
                <Text style={styles.text_button}>2</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('3')}>
                <Text style={styles.text_button}>3</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('4')}>
                <Text style={styles.text_button}>4</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('5')}>
                <Text style={styles.text_button}>5</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('6')}>
                <Text style={styles.text_button}>6</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('7')}>
                <Text style={styles.text_button}>7</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('8')}>
                <Text style={styles.text_button}>8</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('9')}>
                <Text style={styles.text_button}>9</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.bot_top_buttons}
                onPress={() => handleInput('0')}>
                <Text style={styles.text_button}>0</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleInput('.')}>
                <Text style={styles.text_button}>.</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={styles.row}>
              <TouchableOpacity
                style={{
                  marginLeft: 3,
                  marginVertical: 2,
                  borderWidth: 1,
                  borderRadius: 10,
                  width: Dimensions.get('window').width / 3,
                  height: Dimensions.get('window').height / 11.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'darkblue',
                }}
                onPress={handleDelete}>
                <Text style={styles.text_button}>{t('del')}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                marginLeft: 3,
                marginVertical: 2,
                borderWidth: 1,
                borderRadius: 10,
                width: Dimensions.get('window').width / 3,
                height: Dimensions.get('window').height / 5.6,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'green',
              }}
              onPress={() => null}>
              <Text style={styles.text_button}>{t('card.credit')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginLeft: 3,
                marginVertical: 2,
                borderWidth: 1,
                borderRadius: 10,
                width: Dimensions.get('window').width / 3,
                height: Dimensions.get('window').height / 5.6,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'green',
              }}
              onPress={() => null}>
              <Text style={styles.text_button}>{t('cash')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Pay;

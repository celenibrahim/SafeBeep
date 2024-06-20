import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
  Modal,
  Button,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import styles from './PaymentButtons.style';

function PaymentButtons({navigation}: any) {
  const {t}: any = useTranslation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null,
  );

  interface CartItem {
    id: string;
    product_name: string;
  }

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const storedCartItems = await AsyncStorage.getItem('@cart');
        if (storedCartItems) {
          const parsedItems = JSON.parse(storedCartItems);
          console.log('Stored Cart Items:', storedCartItems); // AsyncStorage'deki ham veriyi yazdırır
          console.log('Parsed Cart Items:', parsedItems); // Ayrıştırılmış veriyi yazdırır
          setCartItems(parsedItems);
        }
      } catch (error) {
        console.error('Failed to load cart items from AsyncStorage', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const printAsyncStorageContents = async () => {
      try {
        const allKeys = await AsyncStorage.getAllKeys();
        const allData = await AsyncStorage.multiGet(allKeys);

        console.log('AsyncStorage All Keys:', allKeys);
        console.log('AsyncStorage All Data:', allData);
      } catch (error) {
        console.error('Failed to get AsyncStorage contents:', error);
      }
    };

    printAsyncStorageContents();
  }, []);

  function gotoPay() {
    navigation.navigate('PayPage');
  }

  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleMethodSelect = async (
    method: 'Cancel' | 'Cancel Line' | 'Cancel Document',
  ) => {
    if (method === 'Cancel') {
      setSelectedItemIndex(null);
    } else if (method === 'Cancel Line') {
      if (selectedItemIndex !== null) {
        const newCartItems = [...cartItems];
        newCartItems.splice(selectedItemIndex, 1);
        await AsyncStorage.setItem('@cart', JSON.stringify(newCartItems));
        setCartItems(newCartItems);
        setSelectedItemIndex(null);
      }
    } else if (method === 'Cancel Document') {
      cancelDocument();
    } else {
      setSelectedMethod(method);
    }
  };
  const cancelDocument = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('@cart');
      if (!storedCartItems || JSON.parse(storedCartItems).length === 0) {
        // Sepet boş ise uyarı ver
        Alert.alert(t('empty.cart.alert'));
        return;
      }
      await AsyncStorage.removeItem('@cart');
      setCartItems([]);
      navigation.navigate('Products');
      Alert.alert(t('cancel.doc.alert'));
    } catch (error) {
      console.error(t('cancel.doc.error'), error);
      Alert.alert(t('cancel.doc.error'));
    }
  };

  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (value: any) => {
    setInput(input + value);
  };
  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const [installmentModalVisible, setInstallmentModalVisible] = useState(false);
  const [CampListModalVisible, setCampListModalVisible] = useState(false);
  const openInstallmentModal = () => {
    setInstallmentModalVisible(true);
  };
  const openCampListModal = () => {
    setCampListModalVisible(true);
  };

  const calculateResult = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'green'}]}
          onPress={() => null}>
          <Text style={styles.bt_text}>{t('seller')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'green'}]}
          onPress={() => null}>
          <Text style={styles.bt_text}>{t('a101')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sub_container}>
        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'blue'}]}
          onPress={openInstallmentModal}>
          <Text style={styles.bt_text}>{t('installment')}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={installmentModalVisible}
          onRequestClose={() => setInstallmentModalVisible(false)}>
          <View style={styles.modal_container}>
            <View style={styles.modal_inner_container}>
              <Text style={styles.modal_title}>{t('opt.inst')}</Text>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity>
                  <Text style={styles.modal_text}>5 x {t('installment')}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modal_text}>4 x {t('installment')}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modal_text}>3 x {t('installment')}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modal_text}>2 x {t('installment')}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modal_text}>{t('cancel')}</Text>
                </TouchableOpacity>
              </View>
              <Button
                title={t('close')}
                onPress={() => setInstallmentModalVisible(false)}
              />
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'red'}]}
          onPress={() => handleMethodSelect('Cancel Document')}>
          <Text style={styles.bt_text}>{t('cancel.doc')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sub_container}>
        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'red'}]}
          onPress={() => handleMethodSelect('Cancel Line')}>
          <Text style={styles.bt_text}>{t('cancel.line')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'red'}]}
          onPress={() => handleMethodSelect('Cancel')}>
          <Text style={styles.bt_text}>{t('cancel')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <ScrollView style={styles.prd_cont}>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedItemIndex(index)}>
                <View
                  style={[
                    styles.cart_container,
                    selectedItemIndex === index && styles.selected_item,
                  ]}>
                  <Text style={styles.total_text} selectable={true}>
                    {t(item.product_name)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>{t('empty.cart')}</Text>
          )}
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <View>
            <View style={styles.buttonContainer}>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.bot_top_buttons}
                  onPress={() => handleInput('00')}>
                  <Text style={styles.bt_text}>00</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleDelete}>
                  <Text style={styles.bt_text}>{t('del')}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleInput('1')}>
                  <Text style={styles.bt_text}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleInput('2')}>
                  <Text style={styles.bt_text}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleInput('3')}>
                  <Text style={styles.bt_text}>3</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleInput('4')}>
                  <Text style={styles.bt_text}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleInput('5')}>
                  <Text style={styles.bt_text}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleInput('6')}>
                  <Text style={styles.bt_text}>6</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleInput('7')}>
                  <Text style={styles.bt_text}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleInput('8')}>
                  <Text style={styles.bt_text}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleInput('9')}>
                  <Text style={styles.bt_text}>9</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.bot_top_buttons}
                  onPress={clearInput}>
                  <Text style={styles.bt_text}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleInput('.')}>
                  <Text style={styles.bt_text}>.</Text>
                </TouchableOpacity>
              </View>
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
                  backgroundColor: 'green',
                }}
                onPress={openCampListModal}>
                <Text style={styles.bt_text}>{t('list.camp')}</Text>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={true}
                visible={CampListModalVisible}
                onRequestClose={() => setCampListModalVisible(false)}>
                <View style={styles.modal_container}>
                  <View style={styles.modal_inner_container}>
                    <Text style={styles.modal_title}>{t('camps')}:</Text>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity>
                        <Text style={styles.modal_text}>{t('camp')} 1</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={styles.modal_text}>{t('camp')} 2</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={styles.modal_text}>{t('camp')} 3</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={styles.modal_text}>{t('cancel')}</Text>
                      </TouchableOpacity>
                    </View>
                    <Button
                      title={t('close')}
                      onPress={() => setCampListModalVisible(false)}
                    />
                  </View>
                </View>
              </Modal>
            </View>
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
                backgroundColor: 'red',
              }}
              onPress={() => null}>
              <Text style={styles.bt_text}>{t('amount')}</Text>
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
              <Text style={styles.bt_text}>{t('total.sub')}</Text>
            </TouchableOpacity>
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
              onPress={gotoPay}>
              <Text style={styles.bt_text}>{t('enter')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default PaymentButtons;

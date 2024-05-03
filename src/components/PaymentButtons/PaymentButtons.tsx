import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Button,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './PaymentButtons.style';
function PaymentButtons({navigation}: any) {
  const {t}: any = useTranslation();
  function gotoPay() {
    navigation.navigate('PayPage');
  }
  const [selectedMethod, setSelectedMethod] = useState(null);
  const handleMethodSelect = (method: any) => {
    if (method === 'Cancel') {
      setSelectedMethod(null);
    } else {
      setSelectedMethod(method);
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
          onPress={() => handleMethodSelect('Seller')}>
          <Text style={styles.bt_text}>{t('seller')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'green'}]}
          onPress={() => handleMethodSelect('A101 Hadi')}>
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
          onPress={() => handleMethodSelect('Cencel Line')}>
          <Text style={styles.bt_text}>{t('cancel.line')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'red'}]}
          onPress={() => handleMethodSelect('Cancel')}>
          <Text style={styles.bt_text}>{t('cancel')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <View style={styles.inputContainer}>
          <Text style={styles.input}>{input}</Text>
          <Text style={styles.result}>{result}</Text>
        </View>
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

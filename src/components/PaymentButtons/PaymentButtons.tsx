import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Button,
} from 'react-native';
import styles from './PaymentButtons.style';
const PaymentButtons = () => {
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
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
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
          <Text style={styles.bt_text}>Seller</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'green'}]}
          onPress={() => handleMethodSelect('A101 Hadi')}>
          <Text style={styles.bt_text}>A101 Hadi</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sub_container}>
        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'blue'}]}
          onPress={openModal}>
          <Text style={styles.bt_text}>Installment</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <View style={styles.modal_container}>
            <View style={styles.modal_inner_container}>
              <Text style={styles.modal_title}>Installment Options:</Text>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity>
                  <Text style={styles.modal_text}>5 x Installment</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modal_text}>4 x Installment</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modal_text}>3 x Installment</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modal_text}>2 x Installment</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modal_text}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <Button title="Close" onPress={closeModal} />
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'red'}]}
          onPress={() => handleMethodSelect('Cancel Document')}>
          <Text style={styles.bt_text}>Cancel Document</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sub_container}>
        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'red'}]}
          onPress={() => handleMethodSelect('Cencel Line')}>
          <Text style={styles.bt_text}>Cancel Line</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'red'}]}
          onPress={() => handleMethodSelect('Cancel')}>
          <Text style={styles.bt_text}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {selectedMethod && (
        <View style={styles.selectedMethodContainer}>
          <Text style={styles.selectedMethodText}>
            Selected Method: {selectedMethod}
          </Text>
        </View>
      )}
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
                  <Text style={styles.bt_text}>DEL</Text>
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
                onPress={() => null}>
                <Text style={styles.bt_text}>Campaign List</Text>
              </TouchableOpacity>
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
              <Text style={styles.bt_text}>Amount</Text>
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
              <Text style={styles.bt_text}>SubTotal</Text>
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
              onPress={() => null}>
              <Text style={styles.bt_text}>Enter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentButtons;

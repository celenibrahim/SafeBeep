import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
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

  const calculateResult = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult('Hata');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'darkgreen'}]}
          onPress={() => handleMethodSelect('Seller')}>
          <Text style={styles.bt_text}>Seller</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'darkgreen'}]}
          onPress={() => handleMethodSelect('A101 Hadi')}>
          <Text style={styles.bt_text}>A101 Hadi</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sub_container}>
        <TouchableOpacity
          style={[styles.methodButton, {backgroundColor: 'blue'}]}
          onPress={() => handleMethodSelect('Installment')}>
          <Text style={styles.bt_text}>Installment</Text>
        </TouchableOpacity>
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
        <View style={styles.buttonContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleInput('1')}>
              <Text>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleInput('2')}>
              <Text>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleInput('3')}>
              <Text>3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleInput('4')}>
              <Text>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleInput('5')}>
              <Text>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleInput('6')}>
              <Text>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleInput('7')}>
              <Text>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleInput('8')}>
              <Text>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleInput('9')}>
              <Text>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleInput('0')}>
              <Text>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleInput('+')}>
              <Text>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleInput('-')}>
              <Text>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
              <Text>DEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={clearInput}>
              <Text>C</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={calculateResult}>
              <Text>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentButtons;

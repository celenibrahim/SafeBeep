import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

const PaymentSelection = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [amount, setAmount] = useState('');

  const handleMethodSelect = (method: any) => {
    if (method === 'Cancel') {
      setSelectedMethod(null);
      setAmount('');
    } else {
      setSelectedMethod(method);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Select Your Pay Method</Text>
      <TouchableOpacity
        style={styles.methodButton}
        onPress={() => handleMethodSelect('Credit Card')}>
        <Text>Credit Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.methodButton}
        onPress={() => handleMethodSelect('Cash')}>
        <Text>Cash</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.methodButton}
        onPress={() => handleMethodSelect('Cancel')}>
        <Text>Cancel</Text>
      </TouchableOpacity>
      {selectedMethod && (
        <View style={styles.selectedMethodContainer}>
          <Text style={styles.selectedMethodText}>
            Selected Method: {selectedMethod}
          </Text>
          <TextInput
            style={styles.amountInput}
            placeholder="Type amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={text => setAmount(text)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  methodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedMethodContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedMethodText: {
    fontSize: 16,
    marginBottom: 10,
  },
  amountInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    width: 200,
    marginBottom: 10,
  },
});

export default PaymentSelection;

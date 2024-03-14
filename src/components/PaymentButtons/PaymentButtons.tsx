import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const PaymentButtons = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleMethodSelect = (method: any) => {
    if (method === 'Cancel') {
      setSelectedMethod(null);
    } else {
      setSelectedMethod(method);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  sub_container: {
    flex: 0.07,
    margin: 2,
    height: Dimensions.get('screen').height / 22,
    width: Dimensions.get('screen').width / 1.01,
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Dimensions.get('screen').width / 60,
  },
  methodButton: {
    flex: 1,
    padding: 10,
    width: Dimensions.get('screen').width / 3.3,
    height: Dimensions.get('screen').height / 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginLeft: 5,
    alignItems: 'center',
  },
  bt_text: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedMethodContainer: {
    alignItems: 'center',
  },
  selectedMethodText: {
    fontSize: 16,
    color: 'black',
  },
});

export default PaymentButtons;

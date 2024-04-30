import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../../components/Button';
import Input from '../../components/Input';

import styles from './AdminPanel.style';

function AdminPanel() {
  const [users, setUsers] = useState(
    [] as {
      id: string;
      usercode: string;
      password: string;
      checkoutNo: string;
    }[],
  );
  const [usercode, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const [checkoutNo, setCheckoutNo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignUp = async () => {
    if (
      usercode.trim() === '' ||
      password.trim() === '' ||
      checkoutNo.trim() === ''
    ) {
      Alert.alert(
        'Warning',
        'Please enter the user code, password, and checkout no.',
      );
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      usercode,
      password,
      checkoutNo,
    };
    setUsers([...users, newUser]);
  };

  async function confirmData() {
    try {
      await AsyncStorage.setItem('users', JSON.stringify(users));
      Alert.alert('Warning', 'The registration was successful!');
    } catch (error) {
      Alert.alert('Warning', 'An error occurred during registration!');
    }
  }

  const handleSeeUsers = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers) {
        setModalVisible(true);
        setUsers(JSON.parse(storedUsers));
      } else {
        Alert.alert('Warning', 'No users found!');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while retrieving users!');
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('users');
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        } else {
          setUsers([]);
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while retrieving users!');
      }
    };

    if (modalVisible) {
      fetchUsers();
    }
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Management Panel</Text>
      <Input
        label="Create Usercode"
        placeholder="Usercode..."
        onChangeText={setUserCode}
        value={usercode}
      />
      <Input
        label="Create Password"
        placeholder="Password..."
        onChangeText={setPassword}
        value={password}
      />
      <Input
        label="Create checkoutNo"
        placeholder="Cash No..."
        onChangeText={setCheckoutNo}
        value={checkoutNo}
      />
      <Button text="Save" onPress={handleSignUp} />
      <Button text="Confirm" onPress={confirmData} />
      <Button text="See Users" onPress={handleSeeUsers} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Users</Text>
              <Text style={styles.modalTitle}>
                To delete a user permanently, tap on it.
              </Text>
              <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.userItem}
                    onPress={async () => {
                      try {
                        const filteredUsers = users.filter(
                          u => u.id !== item.id,
                        );
                        await AsyncStorage.setItem(
                          'users',
                          JSON.stringify(filteredUsers),
                        );
                        setUsers(filteredUsers);
                      } catch (error) {
                        console.error('Error removing user:', error);
                        Alert.alert(
                          'Error',
                          'An error occurred while removing user!',
                        );
                      }
                    }}>
                    <Text>Usercode: {item.usercode}</Text>
                    <Text>Password: {item.password}</Text>
                    <Text>Checkout No: {item.checkoutNo}</Text>
                  </TouchableOpacity>
                )}
              />
              <Button text="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default AdminPanel;

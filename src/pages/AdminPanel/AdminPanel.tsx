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
import {Picker} from '@react-native-picker/picker';
import styles from './AdminPanel.style';
import {useTranslation} from 'react-i18next';
import OffOnline from '../../components/OffOnLine/offonline';

const AdminPanel = () => {
  const {t} = useTranslation();

  const [users, setUsers] = useState<
    {
      id: string;
      usercode: string;
      password: string;
      checkoutNo: string;
    }[]
  >([]);

  const [usercode, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const [checkoutNo, setCheckoutNo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const checkoutOptions = [
    'Hallway - 7',
    'Hallway - 5',
    'Entry - 4',
    'Entry - 2',
    'Exit - 1',
  ];

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
        console.error('Error fetching users:', error);
        Alert.alert(t('error'), t('alert.retrievingUser'));
      }
    };
    fetchUsers();
  }, []);

  const handleSignUp = async () => {
    const isEnglishCharacter = (str: string) =>
      /^[A-Za-z0-9!@#\$%\^\&*\)\(+=._-]*$/.test(str);
    const containsUpperCase = (str: string) => /[A-Z]/.test(str);
    const containsPunctuation = (str: string) =>
      /[!@#\$%\^\&*\)\(+=._-]/.test(str);

    if (
      usercode.trim() === '' ||
      password.trim() === '' ||
      checkoutNo.trim() === ''
    ) {
      Alert.alert(t('alert.warning'), t('alert.handleSignUp'));
      return;
    }

    if (usercode.length < 8 || password.length < 8) {
      Alert.alert(t('alert.warning'), t('alert.minLength'));
      return;
    }

    if (!isEnglishCharacter(usercode) || !isEnglishCharacter(password)) {
      Alert.alert(t('alert.warning'), t('alert.englishCharacters'));
      return;
    }

    if (!containsUpperCase(password) || !containsPunctuation(password)) {
      Alert.alert(t('alert.warning'), t('alert.passwordComplexity'));
      return;
    }

    const generateRandomId = () => {
      return Math.floor(10000 + Math.random() * 90000).toString();
    };

    const newUser = {
      id: generateRandomId(),
      usercode,
      password,
      checkoutNo,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    try {
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      Alert.alert(t('alert.warning'), t('registration'));
      setUserCode('');
      setPassword('');
      setCheckoutNo('');
    } catch (error) {
      console.error('Error saving users:', error);
      Alert.alert(t('alert.warning'), t('error.registration'));
    }
  };

  const handleSeeUsers = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers) {
        setModalVisible(true);
        setUsers(JSON.parse(storedUsers));
      } else {
        Alert.alert(t('alert.warning'), t('alert.noUser'));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert(t('error'), t('alert.retrievingUser'));
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const filteredUsers = users.filter(u => u.id !== userId);
      await AsyncStorage.setItem('users', JSON.stringify(filteredUsers));
      setUsers(filteredUsers);
      Alert.alert(t('alert.warning'), t('user.deleted'));
    } catch (error) {
      console.error('Error removing user:', error);
      Alert.alert(t('error'), t('error.removeUser'));
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.text}>{t('managePnl')}</Text>
        <Input
          label={t('createUcode')}
          placeholder={t('usercode')}
          onChangeText={setUserCode}
          value={usercode}
          secureTextEntry={false}
        />
        <Input
          label={t('createPasswd')}
          placeholder={t('password')}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={false}
        />
        <Text style={styles.label}>{t('checkout')}</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={checkoutNo}
            onValueChange={itemValue => setCheckoutNo(itemValue)}>
            {checkoutOptions.map(option => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </View>
        <Button text={t('save')} onPress={handleSignUp} />
        <Button text={t('seeUser')} onPress={handleSeeUsers} />
      </View>
      <View>
        <OffOnline />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t('users')}</Text>
              <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.userItem}
                    onPress={() => handleDeleteUser(item.id)}>
                    <Text style={styles.modalText}>
                      {t('usercode')}: {item.usercode}
                    </Text>
                    <Text style={styles.modalText}>
                      {t('password')}: {item.password}
                    </Text>
                    <Text style={styles.modalText}>
                      {t('checkout')}: {item.checkoutNo}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <Button
                text={t('close')}
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AdminPanel;

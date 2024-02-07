import React, {useContext, useState} from 'react';
import {View, Text, Alert } from 'react-native';

import { UserContext } from '../../context/GlobalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../../components/Button';
import Input from '../../components/Input';

import styles from './AdminPanel.style';

function AdminPanel(){
    const {userInfo,setUserInfo} = useContext(UserContext);
    const [usercode, setUserCode] = useState('');
    const [password, setPassword] = useState('');
    const [checkoutNo, setCheckoutNo] = useState('');

    const handleSignUp = () => {
    if (usercode.trim() === '' || password.trim() === '') {
    Alert.alert('Warning','Please enter the user code and password.');
    return;
    }
    setUserInfo({...userInfo, usercode, password, checkoutNo});
    };
    async function confirmData() {
        try {
          const jsonValue = JSON.stringify(userInfo);
          await AsyncStorage.setItem('userInfo', jsonValue);
          Alert.alert('Warning', 'The Registration was Successful!');
        } catch (e) {
          Alert.alert('Warning', 'An error occurred during registration!');
        }
      }
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                User Management Panel
            </Text>
            <Input label='Create Usercode' placetext='Usercode...' onChangeText={setUserCode} value={null}/>
            <Input label='Create Password' placetext='Password...' onChangeText={setPassword} value={null}/>
            <Input label='Create checkoutNo' placetext='Cash No...' onChangeText={setCheckoutNo} value={null}/>
            <Button text="Save" onPress={handleSignUp}/>
            <Button text="Confirm" onPress={confirmData}/>
        </View>
    )
}
export default AdminPanel;
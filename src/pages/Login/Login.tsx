import React, {useState} from 'react';
import {View, ScrollView, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Login.styles';
import Button from '../../components/Button';
import Input from '../../components/Input';

function Login({navigation}: {navigation: any}) {
  const [Usercode, setUser] = useState('');
  const [Password, setPassword] = useState('');

  async function handleLogin() {
    async function getUserInfoFromStorage() {
      try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        return userInfo !== null ? JSON.parse(userInfo) : null;
      } catch (e) {
        return null;
      }
    }
    if (!Usercode) {
      Alert.alert('Warning', 'The ID number cannot be left blank!');
    } else {
      const userInfo = await getUserInfoFromStorage();
      if (
        userInfo &&
        userInfo.usercode === Usercode &&
        userInfo.password === Password
      ) {
        navigation.navigate('TestPage');
      } else {
        Alert.alert(
          'Warning',
          'The user could not be found. Please check your entry information!',
        );
      }
    }
  }
  function goToCreateUsers() {
    navigation.navigate('AdminPanel');
  }
  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.logo_container}>
          <Image
            style={styles.image}
            source={require('../../assets/logo/safebeeplogo.png')}
          />
        </View>
        <View>
          <Input
            label="Usercode"
            placetext="Enter your usercode..."
            onChangeText={setUser}
            value={Usercode}
          />
          <Input
            label="Password"
            placetext="Enter your password..."
            onChangeText={setPassword}
            value={Password}
          />
        </View>
        <View>
          <Button text="Sign In" onPress={handleLogin} />
          <Button text="Admin Panel" onPress={goToCreateUsers} />
        </View>
      </View>
    </ScrollView>
  );
}
export default Login;

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
    if (!Usercode || !Password) {
      Alert.alert('Warning', 'Usercode and Password cannot be empty!');
      return;
    }

    try {
      const userInfo = await AsyncStorage.getItem('users');
      if (userInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        const foundUser = parsedUserInfo.find(
          (user: {usercode: string; password: string}) =>
            user.usercode === Usercode && user.password === Password,
        );

        if (foundUser) {
          navigation.navigate('MenuStack');
        } else {
          Alert.alert('Warning', 'Invalid Usercode or Password!');
        }
      } else {
        Alert.alert('Warning', 'User information not found!');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while logging in!');
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
            placeholder="Enter your usercode..."
            onChangeText={setUser}
            value={Usercode}
          />
          <Input
            label="Password"
            placeholder="Enter your password..."
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

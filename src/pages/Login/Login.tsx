import React, {useState, useEffect} from 'react';
import {View, ScrollView, Image, Text, Alert, Vibration} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './Login.styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {useUser} from '../../context/UserContext';
import {useNetInfo} from '../../context/NetInfo';
import OffOnline from '../../components/OffOnLine/offonline';
interface VersionInfo {
  version: string;
}
function Login({navigation}: {navigation: any}) {
  const [Usercode, setUser] = useState('');
  const [Password, setPassword] = useState('');
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const {t}: any = useTranslation();
  const {isConnected}: any = useNetInfo();
  const {setUserInfo}: any = useUser();

  useEffect(() => {
    fetchVersionInfo();
  }, []);

  const fetchVersionInfo = async () => {
    try {
      const response = await axios.get<VersionInfo>(
        'http://192.168.56.1:3001/version',
      );
      setVersionInfo(response.data);
    } catch (error) {
      console.error('Error fetching version info:', error);
      setVersionInfo(null);
    }
  };

  async function handleLogin() {
    if (!Usercode || !Password) {
      Vibration.vibrate(1000);
      Alert.alert(t('alert.warning'), t('control.CodePasswd'));
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
          setUserInfo(foundUser);
          navigation.navigate('MenuStack');
        } else {
          Alert.alert(t('alert.warning'), t('error.invalid'));
        }
      } else {
        Alert.alert(t('alert.warning'), t('alert.noUser'));
      }
    } catch (error) {
      Alert.alert(t('error'), t('error.login'));
    }
  }

  function goToCreateUsers() {
    navigation.navigate('AdminPanel');
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.logo_container}>
            <Image
              style={styles.image}
              source={require('../../assets/logo/safebeeplogo.png')}
            />
            {isConnected === false ? (
              <Text style={styles.text}>{t('no.connect')}</Text>
            ) : (
              versionInfo && (
                <Text style={styles.text}>
                  {t('version')} : {versionInfo.version}
                </Text>
              )
            )}
          </View>

          <View>
            <Input
              label={t('usercode')}
              placeholder={t('usercodeEntry')}
              onChangeText={setUser}
              value={Usercode}
              secureTextEntry={false}
            />
            <Input
              label={t('password')}
              placeholder={t('passwordEntry')}
              onChangeText={setPassword}
              value={Password}
              secureTextEntry
            />
          </View>
          <View>
            <Button text={t('sign')} onPress={handleLogin} />
            <Button text={t('adminPnl')} onPress={goToCreateUsers} />
          </View>
        </View>
      </ScrollView>
      <View style={styles.offOnlineContainer}>
        <OffOnline />
      </View>
    </View>
  );
}

export default Login;

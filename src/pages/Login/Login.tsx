import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  TextInput,
  Text,
  Alert,
  Vibration,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Login.styles';
import Button from '../../components/Button';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {useUser} from '../../context/UserContext';
import {useNetInfo} from '../../context/NetInfo';
import OffOnline from '../../components/OffOnLine/offonline';
import {Formik} from 'formik';

interface VersionInfo {
  version: string;
}

function Login({navigation}: {navigation: any}) {
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

  async function handleLogin(values: {usercode: string; password: string}) {
    const {usercode, password} = values;

    if (!usercode || !password) {
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
            user.usercode === usercode && user.password === password,
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
          <Formik
            initialValues={{usercode: '', password: ''}}
            onSubmit={handleLogin}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View>
                <View style={{margin: 10}}>
                  <Text style={styles.label}>{t('usercode')}</Text>
                  <View style={styles.input_container}>
                    <TextInput
                      placeholder={t('usercodeEntry')}
                      onChangeText={handleChange('usercode')}
                      onBlur={handleBlur('usercode')}
                      value={values.usercode}
                    />
                  </View>
                  <Text style={styles.label}>{t('password')}</Text>
                  <View style={styles.input_container}>
                    <TextInput
                      placeholder={t('passwordEntry')}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                    />
                  </View>
                </View>
                <View>
                  <Button onPress={handleSubmit} text={t('sign')} />
                </View>
              </View>
            )}
          </Formik>
          <View>
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

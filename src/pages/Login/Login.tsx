import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import styles from './Login.styles';
import Button from '../../components/Button';
import Input from '../../components/Input';

function Login(){
    return(
        <View style={styles.container}>
            <View style={styles.logo_container}>
                <Image
                style={styles.image}
                source={require('../../assets/logo/safebeeplogo.png')}
                />
            </View>
            <View>
                <Input label='Usercode' placetext='Enter your usercode...'/>
                <Input label='Password' placetext='Enter your password...'/>
                <Button text="Sign In" onPress={null}/>
            </View>
        </View>
    )
}
export default Login;
import React from 'react';
import { TextInput, Text, View } from 'react-native';

import styles from './Input.style';

function Input({label, placetext} : {label : string, placetext : string}){
    return(
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.input_container}>
                <TextInput placeholder={placetext}/>
            </View>
        </View>
    )
}
export default Input;
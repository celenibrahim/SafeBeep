import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './MMCards.style';

const MMCards = ({title, iconUrl, onPress} : {title : any, iconUrl : any, onPress : any}) => {
    return(
        <View style = {styles.container}>
            <Image style={styles.icon} source={iconUrl}/>
            <View style={styles.inner_container}>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.title}>{title}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default MMCards;
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './MMCards.style';

const MMCards = ({
  title,
  iconUrl,
  onPress,
  bgColor,
}: {
  title: any;
  iconUrl: any;
  onPress: any;
  bgColor: any;
}) => {
  return (
    <View>
      <TouchableOpacity style={styles.inner_container} onPress={onPress}>
        <Image
          style={[styles.icon, {backgroundColor: bgColor}]}
          source={iconUrl}
        />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default MMCards;

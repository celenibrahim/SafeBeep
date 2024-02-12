import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';

import styles from './CategoryCard.style';

const CategoryCard = ({imageUrl, Title, onpress}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.inner_container} onPress={onpress}>
        <Image style={styles.image} source={imageUrl} />
        <Text style={styles.text}>{Title}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default CategoryCard;

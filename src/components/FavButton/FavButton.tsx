import React, {useState, useEffect} from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';

const FavButton = ({onPress, isFavorited}: any) => {
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  useEffect(() => {
    setIsFavorite(isFavorited);
  }, [isFavorited]);

  const toggleFavorite = () => {
    setIsFavorite((prevState: any) => !prevState);
    onPress();
  };

  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <Image
        style={styles.icon}
        source={
          isFavorite
            ? require('../../assets/icons/favorited.png')
            : require('../../assets/icons/favorite.png')
        }
      />
    </TouchableOpacity>
  );
};

export default FavButton;

const styles = StyleSheet.create({
  icon: {
    margin: 12,
    width: Dimensions.get('screen').width / 16,
    height: Dimensions.get('screen').height / 35,
    borderRadius: 30,
  },
});

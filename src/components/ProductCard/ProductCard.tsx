import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './ProductCard.style';
import Button from '../Button';
import FavButton from '../FavButton';
import {useTranslation} from 'react-i18next';
const ProductCard = (props: any) => {
  const {t}: any = useTranslation();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem('@favorites');
        if (favorites !== null) {
          const parsedFavorites = JSON.parse(favorites);
          if (parsedFavorites.includes(props.item.id)) {
            setIsFavorited(true);
          }
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [props.item.id]);

  const addToFavoritesPress = async () => {
    try {
      setIsFavorited(!isFavorited);
      const favorites = await AsyncStorage.getItem('@favorites');
      let favoritesArray = favorites ? JSON.parse(favorites) : [];
      if (isFavorited) {
        const index = favoritesArray.indexOf(props.item.id);
        if (index > -1) {
          favoritesArray.splice(index, 1);
        }
      } else {
        favoritesArray.push(props.item.id);
      }
      await AsyncStorage.setItem('@favorites', JSON.stringify(favoritesArray));
    } catch (error) {
      console.error('Error toggling favorites:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Text style={styles.title}>{props.item.product_name}</Text>
      </View>

      <View style={styles.info_container}>
        <View style={{flex: 1}}>
          <Text>
            {t('prdct.code')}: {props.item.id}
          </Text>
          <Text style={styles.price}>
            {t('price')}: {props.item.price}
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <FavButton
            onPress={addToFavoritesPress}
            iconUrl={
              isFavorited
                ? require('../../assets/icons/favorited.png')
                : require('../../assets/icons/favorite.png')
            }
          />
          <Button text={t('add.cart')} onPress={props.addToCartPress} />
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

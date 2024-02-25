import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productsData from '../../../products-data.json';
import styles from './FavPage.style';

interface Product {
  id: string;
  product_name: string;
  price: number;
  category: string;
}

const CartPage = () => {
  const [favoriteItems, setFavoriteItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoritesData = await AsyncStorage.getItem('@favorites');
        if (favoritesData !== null) {
          const parsedFavorites: string[] = JSON.parse(favoritesData);
          setFavoriteItems(parsedFavorites);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const findProductInfo = (id: string): string => {
    const product = productsData.find((item: Product) => item.id === id);
    return product ? `${product.product_name}` : '';
  };

  const countItems = (items: string[]): Record<string, number> => {
    const itemCounts: Record<string, number> = {};
    items.forEach((id: string) => {
      itemCounts[id] = (itemCounts[id] || 0) + 1;
    });
    return itemCounts;
  };
  const removeFavorites = async (id: string) => {
    const updatedFavItems = favoriteItems.filter(item => item !== id);
    setFavoriteItems(updatedFavItems);
    await AsyncStorage.setItem('@favorites', JSON.stringify(updatedFavItems));
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView style={{flex: 1}}>
          {favoriteItems.length === 0 ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View>
                <Text style={styles.emptyText}>There is no favorites...</Text>
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.favoriteItemsContainer}>
                <Text style={styles.sectionTitle}>Favorite Items:</Text>
                <Text style={styles.section_info}>
                  Tap on it to remove favorite products.
                </Text>
                {Object.entries(countItems(favoriteItems)).map(
                  ([id], index) => (
                    <TouchableOpacity
                      key={'favorite_' + index}
                      onPress={() => removeFavorites(id)}>
                      <Text style={styles.favoriteItem}>
                        {findProductInfo(id)}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};
export default CartPage;

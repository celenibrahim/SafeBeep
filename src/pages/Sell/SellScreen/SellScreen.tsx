import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './SellScreen.styles';
import SearchBar from '../../../components/SearchBar';
import CategoryCard from '../../../components/CategoryCard';
function SellScreen() {
  return (
    <ScrollView style={styles.container}>
      <SearchBar />
      <View style={{flexDirection: 'row', flex: 3}}>
        <CategoryCard
          Title="Market"
          onPress={null}
          imageUrl={require('../../../assets/images/market.png')}
        />
        <CategoryCard
          Title="Elektronik"
          onPress={null}
          imageUrl={require('../../../assets/images/electronic.png')}
        />
      </View>
      <View style={{flexDirection: 'row', flex: 3}}>
        <CategoryCard
          Title="Giyim"
          onPress={null}
          imageUrl={require('../../../assets/images/clothes.png')}
        />
        <CategoryCard
          Title="Aksesuar"
          onPress={null}
          imageUrl={require('../../../assets/images/accessories.png')}
        />
      </View>
      <View style={{flexDirection: 'row', flex: 3}}>
        <CategoryCard
          Title="Kitap & Kırtasiye"
          onPress={null}
          imageUrl={require('../../../assets/images/books.png')}
        />
        <CategoryCard
          Title="Temizlik"
          onPress={null}
          imageUrl={require('../../../assets/images/cleaning.png')}
        />
      </View>
    </ScrollView>
  );
}
export default SellScreen;

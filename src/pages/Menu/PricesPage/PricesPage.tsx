import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import OffOnLine from '../../../components/OffOnLine';
import products_data from '../../../products-data.json';

const PricesPage = () => {
  interface Product {
    id: string;
    product_name: string;
    price: number;
    category: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const {t}: any = useTranslation();

  useEffect(() => {
    setProducts(products_data);
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.scrollView}>
        {products.map(product => (
          <View key={product.id} style={styles.card}>
            <Text
              style={
                styles.textStyle
              }>{`${product.id} : ${product.product_name}`}</Text>
            <Text style={[styles.textStyle, styles.priceStyle]}>
              {t('price')} : {product.price} $
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.offOnlineContainer}>
        <OffOnLine />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginBottom: 30,
  },
  card: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceStyle: {
    fontStyle: 'italic',
  },
  offOnlineContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default PricesPage;

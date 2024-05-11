import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
const PricesPage = () => {
  interface Product {
    id: number;
    product_name: string;
    price: number;
    category: string;
  }
  const [products, setProducts] = useState<Product[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.56.1:3001/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <ScrollView>
        {products.map(products => (
          <View key={products.id}>
            <PricePrinter
              productId={products.id}
              product_name={products.product_name}
              price={products.price}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default PricesPage;

const styles = StyleSheet.create({
  textStyle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceStyle: {
    fontStyle: 'italic',
  },
  card: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

const PricePrinter = ({productId, price, product_name}: any) => {
  const {t}: any = useTranslation();
  return (
    <View style={styles.card}>
      <Text style={styles.textStyle}>{`${productId} : ${product_name}`}</Text>
      <Text style={styles.textStyle}>{t('price') + `: ${price} $`}</Text>
    </View>
  );
};

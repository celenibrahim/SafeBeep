import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import products from '../../../products-data.json';
import {useTranslation} from 'react-i18next';
const PricesPage = () => {
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

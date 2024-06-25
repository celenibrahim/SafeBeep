import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {useTranslation} from 'react-i18next';

interface SaleItem {
  userId: string;
  checkoutNo: string;
  date: string;
  totalPrice: number;
  totalPaid: number;
  change: number;
  items: {
    id: string;
    product_name: string;
    quantity: number;
    price: number;
  }[];
}

const SalesScreen = () => {
  const {t}: any = useTranslation();
  const [offlineSales, setOfflineSales] = useState<SaleItem[]>([]);
  const [onlineSales, setOnlineSales] = useState<SaleItem[]>([]);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const offSalesData = await AsyncStorage.getItem('offsales');
        const onSalesData = await AsyncStorage.getItem('onsales');

        if (offSalesData) {
          setOfflineSales(JSON.parse(offSalesData));
        }

        if (onSalesData) {
          setOnlineSales(JSON.parse(onSalesData));
        }
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    };

    fetchSales();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const synchronizeSales = async () => {
    if (!isConnected) {
      Alert.alert(t('error'), t('no.connect'));
      return;
    }

    try {
      const offSalesData = await AsyncStorage.getItem('offsales');
      const offlineSales = offSalesData ? JSON.parse(offSalesData) : [];

      const onSalesData = await AsyncStorage.getItem('onsales');
      const onlineSales = onSalesData ? JSON.parse(onSalesData) : [];

      const combinedSales: SaleItem[] = [...onlineSales, ...offlineSales];

      await AsyncStorage.setItem('onsales', JSON.stringify(combinedSales));
      await AsyncStorage.removeItem('offsales');

      setOnlineSales(combinedSales);
      setOfflineSales([]);
      Alert.alert(t('alert.warning'), t('sync.success'));
    } catch (error) {
      console.error('Error synchronizing sales:', error);
      Alert.alert(t('error'), t('sync.failure'));
    }
  };

  const clearSales = async () => {
    if (!isConnected) {
      Alert.alert(t('error'), t('no.connect'));
      return;
    }

    try {
      await AsyncStorage.removeItem('offsales');
      await AsyncStorage.removeItem('onsales');

      setOfflineSales([]);
      setOnlineSales([]);
      Alert.alert(t('alert.warning'), t('sales.cleared'));
    } catch (error) {
      console.error('Error clearing sales:', error);
      Alert.alert(t('error'), t('clear.failure'));
    }
  };

  const renderSaleItem = ({item}: {item: SaleItem}) => (
    <View style={styles.saleItem}>
      <Text>
        {t('id.cashier')}: {item.userId}
      </Text>
      <Text>
        {t('checkout')}: {item.checkoutNo}
      </Text>
      <Text>
        {t('date')}: {item.date}
      </Text>
      <Text>
        {t('total.price')}: {item.totalPrice} $
      </Text>
      <Text>
        {t('totalPaid')}: {item.totalPaid} $
      </Text>
      <Text>
        {t('change')}: {item.change} $
      </Text>
      <FlatList
        data={item.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Text>
            {item.product_name} - {item.quantity} {t('pieces')} -{' '}
            {item.price * item.quantity} $
          </Text>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {t('offline.sales')} ({offlineSales.length})
      </Text>
      <FlatList
        data={offlineSales}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSaleItem}
        ListEmptyComponent={<Text>{t('no.offline.sales')}</Text>}
      />
      <Text style={styles.header}>
        {t('online.sales')} ({onlineSales.length})
      </Text>
      <FlatList
        data={onlineSales}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSaleItem}
        ListEmptyComponent={<Text>{t('no.online.sales')}</Text>}
      />
      <TouchableOpacity style={styles.syncButton} onPress={synchronizeSales}>
        <Text style={styles.syncButtonText}>{t('sync')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={clearSales}>
        <Text style={styles.clearButtonText}>{t('clr.sls')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  saleItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  syncButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  syncButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SalesScreen;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserProvider} from './context/GlobalContext';
import {CartProvider} from './context/CartContext';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import Settings from './pages/Settings/SettingsPage';
import SellScreen from './pages/Sell/SellScreen';
import Products from './pages/Sell/Products';
import CartPage from './pages/Sell/CartPage';
import FavPage from './pages/Sell/FavPage';
import TotalPage from './pages/Sell/TotalPage';
import PayPage from './pages/Sell/PayPage';
import ReportsPage from './pages/Reports';
import PricesPage from './pages/Menu/PricesPage';
import MenuScreen from './pages/Menu/MenuScreen';
import OtherSettingsPage from './pages/Settings/OtherSettingsPage';
import {useTranslation} from 'react-i18next';
const Stack = createNativeStackNavigator();

const MenuStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PricesPage"
        component={PricesPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const SettingsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsScreen"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtherSettingsPage"
        component={OtherSettingsPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const SellStack = () => {
  const {t}: any = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="SellScreen"
        component={SellScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={{title: t('prdct')}}
      />
      <Stack.Screen
        name="CartPage"
        component={CartPage}
        options={{title: t('cart')}}
      />
      <Stack.Screen
        name="FavPage"
        component={FavPage}
        options={{title: t('fav')}}
      />
      <Stack.Screen
        name="TotalPage"
        component={TotalPage}
        options={{title: t('total.pg')}}
      />
      <Stack.Screen
        name="PayPage"
        component={PayPage}
        options={{title: t('pay.pg')}}
      />
    </Stack.Navigator>
  );
};

function Router() {
  const {t}: any = useTranslation();
  return (
    <UserProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginScreen"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MenuStack"
              component={MenuStack}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AdminPanel"
              component={AdminPanel}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SettingsStack"
              component={SettingsStack}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ReportsPage"
              component={ReportsPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SellStack"
              component={SellStack}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </UserProvider>
  );
}
export default Router;

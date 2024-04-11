import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserProvider} from './context/GlobalContext';
import {CartProvider} from './context/CartContext';
import Login from './pages/Login';
import Menu from './pages/Menu';
import AdminPanel from './pages/AdminPanel';
import Settings from './pages/Settings';
import SellScreen from './pages/Sell/SellScreen';
import Products from './pages/Sell/Products';
import CartPage from './pages/Sell/CartPage';
import FavPage from './pages/Sell/FavPage';
import TotalPage from './pages/Sell/TotalPage';
import PayPage from './pages/Sell/PayPage';

const Stack = createNativeStackNavigator();

const SellStack = () => {
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
        options={{title: 'Products'}}
      />
      <Stack.Screen
        name="CartPage"
        component={CartPage}
        options={{title: 'My Cart'}}
      />
      <Stack.Screen
        name="FavPage"
        component={FavPage}
        options={{title: 'Favorites'}}
      />
      <Stack.Screen
        name="TotalPage"
        component={TotalPage}
        options={{title: 'TotalPage'}}
      />
      <Stack.Screen
        name="PayPage"
        component={PayPage}
        options={{title: 'PayPage'}}
      />
    </Stack.Navigator>
  );
};

function Router() {
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
              name="Menu"
              component={Menu}
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
              name="SettingsPage"
              component={Settings}
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

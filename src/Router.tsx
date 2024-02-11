import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserProvider} from './context/GlobalContext';

import Login from './pages/Login';
import Menu from './pages/Menu';
import AdminPanel from './pages/AdminPanel';
import Settings from './pages/Settings';
import SellScreen from './pages/Sell/SellScreen';

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
        options={{title: 'Sell Screen'}}
      />
      <Stack.Screen
        name="Sell 2"
        component={Menu}
        options={{title: 'Sell 2'}}
      />
      <Stack.Screen
        name="Sell 3"
        component={Menu}
        options={{title: 'Sell 3'}}
      />
      <Stack.Screen
        name="Sell 4"
        component={Menu}
        options={{title: 'Sell 4'}}
      />
    </Stack.Navigator>
  );
};

function Router() {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}
export default Router;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserProvider} from './context/GlobalContext';

import Login from './pages/Login';
import Test from './pages/Menu';
import AdminPanel from './pages/AdminPanel';

const Stack = createNativeStackNavigator();

const SellStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Sell 1"
        component={Test}
        options={{title: 'Sell 1'}}
      />
      <Stack.Screen
        name="Sell 2"
        component={Test}
        options={{title: 'Sell 2'}}
      />
      <Stack.Screen
        name="Sell 3"
        component={Test}
        options={{title: 'Sell 3'}}
      />
      <Stack.Screen
        name="Sell 4"
        component={Test}
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
            name="TestPage"
            component={Test}
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
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
export default Router;

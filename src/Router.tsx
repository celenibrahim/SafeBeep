import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './context/GlobalContext';

import Login from './pages/Login';
import Test from './pages/Test';
import AdminPanel from './pages/AdminPanel';

const Stack = createNativeStackNavigator();

function Router(){
  return(
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name = 'LoginScreen'
            component={Login}
            options={{
            headerShown:false,
            }}/>
          <Stack.Screen
            name = 'TestPage'
            component={Test}
            options={{
            headerShown:false,
            }}/>
          <Stack.Screen
            name = 'AdminPanel'
            component={AdminPanel}
            options={{
            headerShown:false,
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  )
}
export default Router;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/Login';

const Stack = createNativeStackNavigator();

function SafeBeep(){
  return(
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
      name = 'LoginScreen' component={Login}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}
export default SafeBeep;
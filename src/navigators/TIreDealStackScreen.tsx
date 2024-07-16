import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TireDealScreen from '../screens/TireDealScreen';

const TireDealStack = createStackNavigator();

function TireDealStackScreen() {
  return (
    <TireDealStack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerShown: false,
      }}>
      <TireDealStack.Screen name="TireDealScreen" component={TireDealScreen} />
    </TireDealStack.Navigator>
  );
}

export default TireDealStackScreen;

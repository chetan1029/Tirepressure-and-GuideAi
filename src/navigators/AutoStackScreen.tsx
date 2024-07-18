import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AutoMakeListScreen from '../screens/AutoMakeListScreen';
import AddUserTireScreen from '../screens/AddUserTireScreen';
import AutoModelListScreen from '../screens/AutoModelListScreen';
import AutoYearListScreen from '../screens/AutoYearListScreen';
import AutoTiresListScreen from '../screens/AutoTiresListScreen';
import BiCycleTirePressureScreen from '../screens/BiCycleTirePressureScreen';
import MotoMakeListScreen from '../screens/MotoMakeListScreen';
import MotoModelListScreen from '../screens/MotoModelListScreen';
import MotoYearListScreen from '../screens/MotoYearListScreen';
import MotoTiresListScreen from '../screens/MotoTiresListScreen';

const AutoStack = createStackNavigator();

function AutoStackScreen() {
  return (
    <AutoStack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerShown: false,
      }}>
      <AutoStack.Screen
        name="AddUserTireScreen"
        component={AddUserTireScreen}
      />
      {/* Car, Truck & SUV */}
      <AutoStack.Screen
        name="AutoMakeListScreen"
        component={AutoMakeListScreen}
      />
      <AutoStack.Screen
        name="AutoModelListScreen"
        component={AutoModelListScreen}
      />
      <AutoStack.Screen
        name="AutoYearListScreen"
        component={AutoYearListScreen}
      />
      <AutoStack.Screen
        name="AutoTiresListScreen"
        component={AutoTiresListScreen}
      />
      {/* MotorCycle */}
      <AutoStack.Screen
        name="MotoMakeListScreen"
        component={MotoMakeListScreen}
      />
      <AutoStack.Screen
        name="MotoModelListScreen"
        component={MotoModelListScreen}
      />
      <AutoStack.Screen
        name="MotoYearListScreen"
        component={MotoYearListScreen}
      />
      <AutoStack.Screen
        name="MotoTiresListScreen"
        component={MotoTiresListScreen}
      />
      {/* Bicycle */}
      <AutoStack.Screen
        name="BiCycleTirePressureScreen"
        component={BiCycleTirePressureScreen}
      />
    </AutoStack.Navigator>
  );
}

export default AutoStackScreen;

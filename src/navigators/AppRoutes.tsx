import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import {useOfflineStore} from '../store/offline-store';
import {Text} from 'react-native';
import MyVehicleModalScreen from '../screens/MyVehicleModalScreen';

const Stack = createStackNavigator();

const AppRoutes = ({isUserLogin}: any) => {
  // store
  const themeColor = useOfflineStore((state: any) => state.themeColor);
  return (
    <LinearGradient
      colors={[themeColor.primaryBg, themeColor.primaryBg]}
      style={{
        flex: 1,
        justifyContent: 'space-between',
        // Paddings to handle safe area
      }}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer fallback={<Text>Loading...</Text>}>
          <Stack.Navigator>
            <Stack.Group
              screenOptions={{
                headerMode: 'screen',
                headerShown: false,
                presentation: 'transparentModal',
                ...TransitionPresets.ModalPresentationIOS,
              }}>
              <Stack.Screen name="Tab" component={TabNavigator}></Stack.Screen>
              <Stack.Screen
                name="MyVehicleModalScreen"
                component={MyVehicleModalScreen}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </GestureHandlerRootView>
    </LinearGradient>
  );
};

export default AppRoutes;

import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FONTSIZE} from '../theme/theme';
import MyVehicleScreen from '../screens/MyVehicleScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'intl-pluralrules';
import {useTranslation} from 'react-i18next';
import i18n from '../utils/i18n';
import {useOfflineStore} from '../store/offline-store';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SettingStackScreen from './SettingStackScreen';
import Feather from 'react-native-vector-icons/Feather';
import AutoStackScreen from './AutoStackScreen';
import GuideAiStackScreen from './GuideAiStackScreen';
import CalculatorStackScreen from './TIreDealStackScreen';
import TireDealScreen from '../screens/TireDealScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = ({route, navigation}: any) => {
  // Store
  const Settings = useOfflineStore((state: any) => state.Settings);
  const themeColor = useOfflineStore((state: any) => state.themeColor);

  // Const
  const {t} = useTranslation();

  const insets = useSafeAreaInsets();

  // Get the name of the focused route
  const focusedRoute = getFocusedRouteNameFromRoute(route);
  const routeName = focusedRoute ? focusedRoute : 'AddUserTire';

  // use effect to use language
  useEffect(() => {
    if (Settings.language) {
      i18n.changeLanguage(Settings.language);
    }
  }, [Settings]);

  return (
    <View
      style={{
        backgroundColor: themeColor.primaryBg,
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: insets.top,
        paddingBottom: 0, // make bottom safe area padding (insets.bottom) 0
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <Tab.Navigator
        initialRouteName="AddUserTire"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: true,
          tabBarStyle: [
            styles.tabBarStyle,
            {
              backgroundColor: themeColor.priamryDarkBg,
            },
          ],
        }}>
        <Tab.Screen
          name="MyVehicleScreen"
          component={MyVehicleScreen}
          options={{
            tabBarLabel: ({focused, color}) => {
              return (
                <Text
                  style={[
                    styles.tabBarLabel,
                    {
                      color: focused
                        ? themeColor.primaryTextFocus
                        : themeColor.primaryText,
                    },
                  ]}>
                  {t('myGarage')}
                </Text>
              );
            },
            tabBarIcon: ({focused, color, size}) => {
              return (
                <Ionicons
                  name="car-outline"
                  size={28}
                  color={
                    focused
                      ? themeColor.primaryTextFocus
                      : themeColor.primaryText
                  }
                />
              );
            },
          }}></Tab.Screen>
        <Tab.Screen
          name="GuideAiStackScreen"
          component={GuideAiStackScreen}
          options={{
            tabBarLabel: ({focused, color}) => {
              return (
                <Text
                  style={[
                    styles.tabBarLabel,
                    {
                      color: focused
                        ? themeColor.primaryTextFocus
                        : themeColor.primaryText,
                    },
                  ]}>
                  {t('guideAI')}
                </Text>
              );
            },
            tabBarIcon: ({focused, color, size}) => {
              return (
                <Ionicons
                  name="sparkles-outline"
                  size={28}
                  color={
                    focused
                      ? themeColor.primaryTextFocus
                      : themeColor.primaryText
                  }
                />
              );
            },
          }}></Tab.Screen>
        <Tab.Screen
          name="AutoStackScreen"
          component={AutoStackScreen}
          options={{
            tabBarLabel: ({focused, color}) => {
              return '';
            },
            tabBarIcon: ({focused, color, size}) => {
              return (
                <Feather
                  name="arrow-up-circle"
                  size={50}
                  color={
                    focused
                      ? themeColor.primaryTextFocus
                      : themeColor.primaryText
                  }
                  style={{
                    top: -30,
                  }}
                />
              );
            },
          }}></Tab.Screen>
        <Tab.Screen
          name="TireDealScreen"
          component={TireDealScreen}
          options={{
            tabBarLabel: ({focused, color}) => {
              return (
                <Text
                  style={[
                    styles.tabBarLabel,
                    {
                      color: focused
                        ? themeColor.primaryTextFocus
                        : themeColor.primaryText,
                    },
                  ]}>
                  {t('tireDeals')}
                </Text>
              );
            },
            tabBarIcon: ({focused, color, size}) => {
              return (
                <Ionicons
                  name="bag-handle-outline"
                  size={28}
                  color={
                    focused
                      ? themeColor.primaryTextFocus
                      : themeColor.primaryText
                  }
                />
              );
            },
          }}></Tab.Screen>
        <Tab.Screen
          name="SettingStack"
          component={SettingStackScreen}
          options={{
            tabBarLabel: ({focused, color}) => {
              return (
                <Text
                  style={[
                    styles.tabBarLabel,
                    {
                      color: focused
                        ? themeColor.primaryTextFocus
                        : themeColor.primaryText,
                    },
                  ]}>
                  {t('settings')}
                </Text>
              );
            },
            tabBarIcon: ({focused, color, size}) => {
              return (
                <Ionicons
                  name="settings-outline"
                  size={28}
                  color={
                    focused
                      ? themeColor.primaryTextFocus
                      : themeColor.primaryText
                  }
                />
              );
            },
          }}></Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 90,
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 0, // for iOS
    },
  },
  blurViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  tabBarLabel: {
    fontSize: FONTSIZE.size_12,
  },
});

export default TabNavigator;

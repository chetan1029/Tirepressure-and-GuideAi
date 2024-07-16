import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useStore} from '../store/store';
import {useOfflineStore} from '../store/offline-store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import _ from 'lodash';
import 'intl-pluralrules';
import {useTranslation} from 'react-i18next';
import i18n from '../utils/i18n';

// Components
import HeaderBar from '../components/HeaderBar';

// Memorized functions
import {showToast} from '../utils/common';
import LoadingCard from '../components/LoadingCard';
import TirePressureFlatList from '../components/TirePressureFlatList';

const MyVehicleScreen = ({route, navigation}: any) => {
  // State
  const [loading, setLoading] = useState(false);

  // Store
  const UserTiresItems = useStore((state: any) => state.UserTiresItems);
  const fetchUserTires = useStore((state: any) => state.fetchUserTires);
  const UserDetail = useStore((state: any) => state.UserDetail);
  const themeColor = useOfflineStore((state: any) => state.themeColor);
  const Settings = useOfflineStore((state: any) => state.Settings);

  // Other variables
  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  // Const
  const {t} = useTranslation();

  // Use effect to fetch wish list
  useEffect(() => {
    if (!UserDetail || !UserDetail.uid) {
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      if (UserDetail) {
        await fetchUserTires(UserDetail);
      }
      setLoading(false);
    };

    fetchData();
  }, [fetchUserTires, UserDetail]);

  // use effect to use language
  useEffect(() => {
    if (Settings.language) {
      i18n.changeLanguage(Settings.language);
    }
  }, [Settings]);

  return (
    <View
      style={[styles.ScreenContainer, {backgroundColor: themeColor.primaryBg}]}>
      <StatusBar backgroundColor={themeColor.primaryBg}></StatusBar>

      {/* App Header */}
      <HeaderBar title={t('myGarage')} themeColor={themeColor} />

      {loading ? (
        <LoadingCard title="" />
      ) : (
        <TirePressureFlatList
          ListRef={ListRef}
          tabBarHeight={tabBarHeight}
          userTires={UserTiresItems}
          navigation={navigation}
          themeColor={themeColor}
          t={t}
        />
      )}
    </View>
  );
};

export default MyVehicleScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Overlay: {
    flex: 1,
  },
  LottieStyle: {
    height: 500,
  },
});

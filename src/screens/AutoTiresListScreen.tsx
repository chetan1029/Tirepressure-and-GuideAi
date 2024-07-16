import {
  Image,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useStore} from '../store/store';
import {useOfflineStore} from '../store/offline-store';
import 'intl-pluralrules';
import {useTranslation} from 'react-i18next';
import i18n from '../utils/i18n';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

// Components
import HeaderBar from '../components/HeaderBar';
import LoadingCard from '../components/LoadingCard';
import AutoOptionFlatList from '../components/AutoOptionFlatList';

const AutoTiresListScreen = ({route, navigation}: any) => {
  // State
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Store
  const addAutoUserTire = useStore((state: any) => state.addAutoUserTire);
  const themeColor = useOfflineStore((state: any) => state.themeColor);
  const Settings = useOfflineStore((state: any) => state.Settings);
  const UserDetail = useStore((state: any) => state.UserDetail);

  // Const
  const {t} = useTranslation();
  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  // Other variables
  const makeId = route?.params?.makeId;
  const makeName = route?.params?.makeName;
  const modelId = route?.params?.modelId;
  const modelName = route?.params?.modelName;
  const year = route?.params?.year;
  const tireSizes = route?.params?.tireSizes;

  const getNavigationParams = (item: any) => ({
    makeId: makeId,
    makeName: makeName,
    modelId: modelId,
    modelName: modelName,
    year: year,
    user: UserDetail,
  });

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
      <HeaderBar
        title={t('selectAutoYear')}
        themeColor={themeColor}
        backButton={() => {
          navigation.navigate('AutoYearListScreen', {
            makeId: makeId,
            makeName: makeName,
            modelId: modelId,
            modelName: modelName,
          });
        }}
      />

      {loading ? (
        <LoadingCard title="" />
      ) : (
        <AutoOptionFlatList
          ListRef={ListRef}
          tabBarHeight={tabBarHeight}
          userTires={tireSizes}
          navigation={navigation}
          themeColor={themeColor}
          targetScreen=""
          getNavigationParams={getNavigationParams}
          t={t}
          addAutoUserTire={addAutoUserTire}
        />
      )}
    </View>
  );
};

export default AutoTiresListScreen;

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

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
import SearchBar from '../components/SearchBar';
import BannerAds from '../components/BannerAds';

const MotoMakeListScreen = ({navigation}: any) => {
  // State
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [motoMakeList, setMotoMakeList] = useState<any>([]);

  // Store
  const MotoMake = useStore((state: any) => state.MotoMake);
  const fetchMotoMake = useStore((state: any) => state.fetchMotoMake);
  const themeColor = useOfflineStore((state: any) => state.themeColor);
  const Settings = useOfflineStore((state: any) => state.Settings);

  // Const
  const {t} = useTranslation();
  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  // Use effect to fetch wish list
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchMotoMake();
      setLoading(false);
    };

    fetchData();
  }, [fetchMotoMake]);

  // Use effect to update auto make list when Automake changes
  useEffect(() => {
    setMotoMakeList(MotoMake);
  }, [MotoMake]);

  // Functions
  const searchMakeList = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setMotoMakeList([
        ...MotoMake.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  const resetMakeSearch = () => {
    setSearchText('');
    setMotoMakeList(MotoMake);
  };

  const getNavigationParams = (item: any) => ({
    makeId: item.id,
    makeName: item.name,
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
        title={t('selectMotoMake')}
        themeColor={themeColor}
        backButton={() => {
          navigation.navigate('AddUserTireScreen');
        }}
      />

      {/* Search Input */}
      <SearchBar
        searchText={searchText}
        searchList={searchMakeList}
        setSearchText={setSearchText}
        resetSearch={resetMakeSearch}
        themeColor={themeColor}
        placeholder={t('searchMotoMake')}
      />

      {/* Banner Ads */}
      <BannerAds />

      {loading ? (
        <LoadingCard title="" />
      ) : (
        <AutoOptionFlatList
          ListRef={ListRef}
          tabBarHeight={tabBarHeight}
          userTires={motoMakeList}
          navigation={navigation}
          themeColor={themeColor}
          targetScreen="MotoModelListScreen"
          getNavigationParams={getNavigationParams}
          t={t}
        />
      )}
    </View>
  );
};

export default MotoMakeListScreen;

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

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

const MotoModelListScreen = ({route, navigation}: any) => {
  // State
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [motoModelList, setMotoModelList] = useState<any>([]);

  // Store
  const MotoModel = useStore((state: any) => state.MotoModel);
  const fetchMotoModel = useStore((state: any) => state.fetchMotoModel);
  const themeColor = useOfflineStore((state: any) => state.themeColor);
  const Settings = useOfflineStore((state: any) => state.Settings);

  // Const
  const {t} = useTranslation();
  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  // Other variables
  const makeId = route?.params?.makeId;
  const makeName = route?.params?.makeName;

  // Use effect to fetch models
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchMotoModel(makeId);
      setLoading(false);
    };

    fetchData();
  }, [fetchMotoModel, makeId]);

  // Use effect to update auto model list when AutoModel changes
  useEffect(() => {
    setMotoModelList(MotoModel);
  }, [MotoModel]);

  // Functions
  const searchModelList = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setMotoModelList([
        ...MotoModel.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  const resetModelSearch = () => {
    setSearchText('');
    setMotoModelList(MotoModel);
  };

  const getNavigationParams = (item: any) => ({
    makeId: makeId,
    makeName: makeName,
    modelId: item.id,
    modelName: item.name,
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
        title={t('selectMotoModel')}
        themeColor={themeColor}
        backButton={() => {
          navigation.navigate('MotoMakeListScreen');
        }}
      />

      {/* Search Input */}
      <SearchBar
        searchText={searchText}
        searchList={searchModelList}
        setSearchText={setSearchText}
        resetSearch={resetModelSearch}
        themeColor={themeColor}
        placeholder={t('searchMotoModel')}
      />

      {/* Banner Ads */}
      <BannerAds />

      {loading ? (
        <LoadingCard title="" />
      ) : (
        <AutoOptionFlatList
          ListRef={ListRef}
          tabBarHeight={tabBarHeight}
          userTires={motoModelList}
          navigation={navigation}
          themeColor={themeColor}
          targetScreen="MotoYearListScreen"
          getNavigationParams={getNavigationParams}
          t={t}
        />
      )}
    </View>
  );
};

export default MotoModelListScreen;

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

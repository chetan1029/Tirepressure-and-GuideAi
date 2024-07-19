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

const MotoYearListScreen = ({route, navigation}: any) => {
  // State
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [motoYearList, setMotoYearList] = useState<any>([]);

  // Store
  const MotoYear = useStore((state: any) => state.MotoYear);
  const fetchMotoYear = useStore((state: any) => state.fetchMotoYear);
  const themeColor = useOfflineStore((state: any) => state.themeColor);
  const Settings = useOfflineStore((state: any) => state.Settings);

  // Const
  const {t} = useTranslation();
  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  // Other variables
  const makeId = route?.params?.makeId;
  const makeName = route?.params?.makeName;
  const modelId = route?.params?.modelId;
  const modelName = route?.params?.modelName;

  // Use effect to fetch models
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchMotoYear(makeId, modelId);
      setLoading(false);
    };

    fetchData();
  }, [fetchMotoYear, makeId]);

  // Use effect to update auto model list when AutoYear changes
  useEffect(() => {
    setMotoYearList(MotoYear);
  }, [MotoYear]);

  // Functions
  const searchModelList = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setMotoYearList([
        ...MotoYear.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  const resetYearSearch = () => {
    setSearchText('');
    setMotoYearList(MotoYear);
  };

  const getNavigationParams = (item: any) => ({
    makeId: makeId,
    makeName: makeName,
    modelId: modelId,
    modelName: modelName,
    year: item.id,
    tireSizes: item?.tireSizes,
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
        title={t('selectMotoYear')}
        themeColor={themeColor}
        backButton={() => {
          navigation.navigate('MotoModelListScreen', {
            makeId: makeId,
            makeName: makeName,
          });
        }}
      />

      {/* Search Input */}
      <SearchBar
        searchText={searchText}
        searchList={searchModelList}
        setSearchText={setSearchText}
        resetSearch={resetYearSearch}
        themeColor={themeColor}
        placeholder={t('searchMotoYear')}
      />

      {/* Banner Ads */}
      <BannerAds />

      {loading ? (
        <LoadingCard title="" />
      ) : (
        <AutoOptionFlatList
          ListRef={ListRef}
          tabBarHeight={tabBarHeight}
          userTires={motoYearList}
          navigation={navigation}
          themeColor={themeColor}
          targetScreen="MotoTiresListScreen"
          getNavigationParams={getNavigationParams}
          searchViaGuideAi={''}
          userDetail={''}
          t={t}
        />
      )}
    </View>
  );
};

export default MotoYearListScreen;

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

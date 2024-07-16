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

const AutoYearListScreen = ({route, navigation}: any) => {
  // State
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [autoYearList, setAutoYearList] = useState<any>([]);

  // Store
  const AutoYear = useStore((state: any) => state.AutoYear);
  const fetchAutoYear = useStore((state: any) => state.fetchAutoYear);
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
      await fetchAutoYear(makeId, modelId);
      setLoading(false);
    };

    fetchData();
  }, [fetchAutoYear, makeId]);

  // Use effect to update auto model list when AutoYear changes
  useEffect(() => {
    setAutoYearList(AutoYear);
  }, [AutoYear]);

  // Functions
  const searchModelList = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setAutoYearList([
        ...AutoYear.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  const resetYearSearch = () => {
    setSearchText('');
    setAutoYearList(AutoYear);
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
        title={t('selectAutoYear')}
        themeColor={themeColor}
        backButton={() => {
          navigation.navigate('AutoModelListScreen', {makeId: makeId});
        }}
      />

      {/* Search Input */}
      <SearchBar
        searchText={searchText}
        searchList={searchModelList}
        setSearchText={setSearchText}
        resetSearch={resetYearSearch}
        themeColor={themeColor}
        placeholder={t('searchAutoYear')}
      />

      {loading ? (
        <LoadingCard />
      ) : (
        <AutoOptionFlatList
          ListRef={ListRef}
          tabBarHeight={tabBarHeight}
          userTires={autoYearList}
          navigation={navigation}
          themeColor={themeColor}
          targetScreen="AutoTiresListScreen"
          getNavigationParams={getNavigationParams}
          t={t}
        />
      )}
    </View>
  );
};

export default AutoYearListScreen;

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

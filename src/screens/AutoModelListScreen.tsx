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

const AutoModelListScreen = ({route, navigation}: any) => {
  // State
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [autoModelList, setAutoModelList] = useState<any>([]);

  // Store
  const AutoModel = useStore((state: any) => state.AutoModel);
  const fetchAutoModel = useStore((state: any) => state.fetchAutoModel);
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
      await fetchAutoModel(makeId);
      setLoading(false);
    };

    fetchData();
  }, [fetchAutoModel, makeId]);

  // Use effect to update auto model list when AutoModel changes
  useEffect(() => {
    setAutoModelList(AutoModel);
  }, [AutoModel]);

  // Functions
  const searchModelList = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setAutoModelList([
        ...AutoModel.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  const resetModelSearch = () => {
    setSearchText('');
    setAutoModelList(AutoModel);
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
        title={t('selectAutoModel')}
        themeColor={themeColor}
        backButton={() => {
          navigation.navigate('AutoMakeListScreen');
        }}
      />

      {/* Search Input */}
      <SearchBar
        searchText={searchText}
        searchList={searchModelList}
        setSearchText={setSearchText}
        resetSearch={resetModelSearch}
        themeColor={themeColor}
        placeholder={t('searchAutoModel')}
      />

      {loading ? (
        <LoadingCard />
      ) : (
        <AutoOptionFlatList
          ListRef={ListRef}
          tabBarHeight={tabBarHeight}
          userTires={autoModelList}
          navigation={navigation}
          themeColor={themeColor}
          targetScreen="AutoYearListScreen"
          getNavigationParams={getNavigationParams}
          t={t}
        />
      )}
    </View>
  );
};

export default AutoModelListScreen;

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

import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useOfflineStore} from '../store/offline-store';
import 'intl-pluralrules';
import {useTranslation} from 'react-i18next';
import i18n from '../utils/i18n';

// Components
import HeaderBar from '../components/HeaderBar';
import AmazonTireDeal from '../components/AmazonTireDeal';
import {useStore} from '../store/store';
import EmptyListAnimation from '../components/EmptyListAnimation';
import {SPACING} from '../theme/theme';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import BannerAds from '../components/BannerAds';

const TireDealScreen = ({navigation}: any) => {
  // state
  const [loading, setLoading] = useState(false);
  const themeColor = useOfflineStore((state: any) => state.themeColor);
  const Settings = useOfflineStore((state: any) => state.Settings);

  //Store
  const TireDealItems = useStore((state: any) => state.TireDealItems);
  const fetchTireDealItems = useStore((state: any) => state.fetchTireDealItems);

  // Const
  const {t} = useTranslation();
  const ListRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  // Use effect to fetch wish list
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchTireDealItems();
      setLoading(false);
    };

    fetchData();
  }, [fetchTireDealItems]);

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
      <HeaderBar title={t('tireDeals')} themeColor={themeColor} />

      <FlatList
        ref={ListRef}
        horizontal={false}
        ListEmptyComponent={<EmptyListAnimation title={t('noResultFound')} />}
        showsVerticalScrollIndicator={false}
        data={TireDealItems}
        ListFooterComponent={<BannerAds type="RectangleBanner" />}
        contentContainerStyle={styles.FlatListContainer}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({item}) => {
          return (
            <AmazonTireDeal
              link={item.link}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              themeColor={themeColor}
            />
          );
        }}
        style={{marginBottom: tabBarHeight * 1.2}}
      />
    </View>
  );
};

export default TireDealScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
  },
  FlatListContainer: {
    gap: SPACING.space_10,
    paddingVertical: SPACING.space_15,
    paddingHorizontal: SPACING.space_20,
    flexGrow: 1,
  },
});

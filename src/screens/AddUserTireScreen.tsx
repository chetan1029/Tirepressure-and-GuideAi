import {
  Image,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
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
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import BannerAds from '../components/BannerAds';

const AddUserTireScreen = ({navigation}: any) => {
  // State
  const [loading, setLoading] = useState(false);

  // Store
  const AutoMake = useStore((state: any) => state.AutoMake);
  const fetchAutoMake = useStore((state: any) => state.fetchAutoMake);
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
      await fetchAutoMake();
      setLoading(false);
    };

    fetchData();
  }, [fetchAutoMake]);

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
      <HeaderBar title={t('selectYourVehicle')} themeColor={themeColor} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AutoMakeListScreen', {
            id: '',
          });
        }}
        style={[
          styles.InputContainerComponent,
          {backgroundColor: themeColor.priamryDarkBg},
        ]}>
        <View style={styles.CardInfoContainer}>
          <View style={styles.CardImageContainer}>
            <Image
              source={require('../assets/images/auto.png')}
              style={styles.ImageStyle}
            />
          </View>
          <Text style={[styles.CardTitle, {color: themeColor.secondaryText}]}>
            Cars, SUV, Truck & Van
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MotoMakeListScreen', {
            id: '',
          });
        }}
        style={[
          styles.InputContainerComponent,
          {backgroundColor: themeColor.priamryDarkBg},
        ]}>
        <View style={styles.CardInfoContainer}>
          <View style={styles.CardImageContainer}>
            <Image
              source={require('../assets/images/motorcycle.png')}
              style={styles.ImageStyle}
            />
          </View>
          <Text style={[styles.CardTitle, {color: themeColor.secondaryText}]}>
            Motorcycle
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BiCycleTirePressureScreen');
        }}
        style={[
          styles.InputContainerComponent,
          {backgroundColor: themeColor.priamryDarkBg},
        ]}>
        <View style={styles.CardInfoContainer}>
          <View style={styles.CardImageContainer}>
            <Image
              source={require('../assets/images/bicycle.png')}
              style={styles.ImageStyle}
            />
          </View>
          <Text style={[styles.CardTitle, {color: themeColor.secondaryText}]}>
            Bicycle
          </Text>
        </View>
      </TouchableOpacity>
      {/* Banner Ads */}
      <BannerAds />
    </View>
  );
};

export default AddUserTireScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputContainerComponent: {
    flexDirection: 'row',
    marginHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  CardInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    paddingBottom: SPACING.space_10,
    paddingTop: SPACING.space_20,
  },
  CardImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageStyle: {
    marginTop: SPACING.space_10,
    maxWidth: '100%',
    height: 80,
    resizeMode: 'contain',
  },
});

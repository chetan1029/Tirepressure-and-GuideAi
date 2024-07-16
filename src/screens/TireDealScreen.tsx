import {
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useOfflineStore} from '../store/offline-store';
import 'intl-pluralrules';
import {useTranslation} from 'react-i18next';
import i18n from '../utils/i18n';

// Components
import HeaderBar from '../components/HeaderBar';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TireDealScreen = ({navigation}: any) => {
  const themeColor = useOfflineStore((state: any) => state.themeColor);
  const Settings = useOfflineStore((state: any) => state.Settings);

  // Const
  const {t} = useTranslation();

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

      <TouchableOpacity
        style={[
          styles.InputContainerComponent,
          {backgroundColor: themeColor.priamryDarkBg},
        ]}
        onPress={() => {
          Linking.openURL('https://amzn.to/4cXPRNd');
        }}>
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="logo-amazon"
              size={34}
              color={themeColor.secondaryText}
            />
          </View>
          <Text style={[styles.title, {color: themeColor.secondaryText}]}>
            {t('tiresForSaleOnAmazon')}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.InputContainerComponent,
          {backgroundColor: themeColor.priamryDarkBg},
        ]}
        onPress={() => {
          Linking.openURL('https://amzn.to/3WmCWPi');
        }}>
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="logo-amazon"
              size={34}
              color={themeColor.secondaryText}
            />
          </View>
          <Text style={[styles.title, {color: themeColor.secondaryText}]}>
            {t('pressureSaleOnAmazon')}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.InputContainerComponent,
          {backgroundColor: themeColor.priamryDarkBg},
        ]}
        onPress={() => {
          Linking.openURL('https://amzn.to/3WqHEvK');
        }}>
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="logo-amazon"
              size={34}
              color={themeColor.secondaryText}
            />
          </View>
          <Text style={[styles.title, {color: themeColor.secondaryText}]}>
            {t('tireRepairOnAmazon')}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.InputContainerComponent,
          {backgroundColor: themeColor.priamryDarkBg},
        ]}
        onPress={() => {
          Linking.openURL('https://amzn.to/3S7SILn');
        }}>
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="logo-amazon"
              size={34}
              color={themeColor.secondaryText}
            />
          </View>
          <Text style={[styles.title, {color: themeColor.secondaryText}]}>
            {t('tireInflatorOnAmazon')}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.InputContainerComponent,
          {backgroundColor: themeColor.priamryDarkBg},
        ]}
        onPress={() => {
          Linking.openURL('https://amzn.to/464LTjv');
        }}>
        <View style={styles.titleContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="logo-amazon"
              size={34}
              color={themeColor.secondaryText}
            />
          </View>
          <Text style={[styles.title, {color: themeColor.secondaryText}]}>
            {t('tirePressureMonitorOnAmazon')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TireDealScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    marginHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_10,
    paddingHorizontal: SPACING.space_20,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: SPACING.space_20 * 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: SPACING.space_15,
  },
  icon: {
    marginRight: SPACING.space_15,
    paddingVertical: SPACING.space_15,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    maxWidth: '100%',
  },
});

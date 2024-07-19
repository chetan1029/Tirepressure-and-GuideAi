import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {showToast, pressureConverter, amazonDealLink} from '../utils/common';
import {CommonActions} from '@react-navigation/native';
import {useOfflineStore} from '../store/offline-store';
import AmazonTireDeal from './AmazonTireDeal';
import BannerAds from './BannerAds';
import GuideAiSearchCard from './GuideAiSearchCard';

interface AutoOptionTireCardProps {
  themeColor: any;
  navigation: any;
  targetScreen: string;
  getNavigationParams: (item: any) => any;
  item: any;
  searchViaGuideAi: any;
  userDetail: any;
  t: any;
  addAutoUserTire: any;
}

const AutoOptionTireCard: React.FC<AutoOptionTireCardProps> = ({
  themeColor,
  navigation,
  targetScreen,
  getNavigationParams,
  item,
  searchViaGuideAi,
  userDetail,
  t,
  addAutoUserTire,
}) => {
  const Settings = useOfflineStore((state: any) => state.Settings);
  const pressureUnit = Settings.pressureUnit;
  const autoDetail = getNavigationParams(item);
  let searchText = '';
  let prompt = '';

  if (autoDetail?.makeName && autoDetail.modelName && autoDetail.year) {
    searchText = `Unable to find tire pressure in our Datatabse use our GuideAi to find Tire pressure`;
    prompt = `Give me front tire pressure and rear tire pressure in ${pressureUnit} for ${autoDetail?.year} ${autoDetail?.makeName} ${autoDetail?.modelName} with front tire size is ${item?.front_tire_size} and rear tire size is ${item?.rear_tire_size}`;
  }

  const handleAddAutoTire = async () => {
    Alert.alert(t('addAutoToGarage'), t('wannaAddAutoToGarage'), [
      {
        text: t('cancel'),
      },
      {
        text: t('save'),
        style: 'default',
        onPress: async () => {
          const autoDetail = getNavigationParams(item);
          await addAutoUserTire(
            autoDetail?.makeName,
            autoDetail?.modelName,
            autoDetail?.year,
            item?.front_tire_pressure,
            item?.front_tire_size,
            item?.rear_tire_pressure,
            item?.rear_tire_size,
            autoDetail?.user,
          );
          navigation.navigate('MyVehicleScreen', {});
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'AddUserTireScreen'}],
            }),
          );
          showToast(t('addedToWishlist'), 'success');
        },
      },
    ]);
  };
  return (
    <>
      <TouchableOpacity
        onPress={
          item.front_tire_pressure == 0 && item.rear_tire_pressure == 0
            ? () => {}
            : handleAddAutoTire
        }
        style={[
          styles.CardLinearGradient,
          {backgroundColor: themeColor.priamryDarkBg},
        ]}>
        <View style={styles.CardInfoContainer}>
          <View style={styles.CardSubInfoContainer}>
            <Text
              style={[styles.TextSubTitle, {color: themeColor.secondaryText}]}>
              Rear Tire Pressure
            </Text>
            <Text style={[styles.TextTitle, {color: themeColor.secondaryText}]}>
              {pressureConverter(item.rear_tire_pressure, pressureUnit)}
            </Text>
            <Text
              style={[styles.TextSubTitle, {color: themeColor.secondaryText}]}>
              {item.rear_tire_size}
            </Text>
          </View>
          <View style={styles.CardSubInfoContainer}>
            <Text
              style={[styles.TextSubTitle, {color: themeColor.secondaryText}]}>
              Front Tire Pressure
            </Text>
            <Text style={[styles.TextTitle, {color: themeColor.secondaryText}]}>
              {pressureConverter(item.front_tire_pressure, pressureUnit)}
            </Text>
            <Text
              style={[styles.TextSubTitle, {color: themeColor.secondaryText}]}>
              {item.front_tire_size}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.cardGuideAiContainer}>
        {item.front_tire_pressure == 0 && item.rear_tire_pressure == 0 && (
          <GuideAiSearchCard
            themeColor={themeColor}
            navigation={navigation}
            targetScreen="GuideAiDetailScreen"
            getNavigationParams={(item: any, guideId: string) => ({
              prompt: prompt,
              type: 'user-history',
              guideId: guideId,
            })}
            item={{
              text: searchText,
              prompt: prompt,
              type: 'user-history',
              from: 'tireDetail',
            }}
            searchViaGuideAi={searchViaGuideAi}
            userDetail={userDetail}
            t={t}
          />
        )}
      </View>
      <AmazonTireDeal
        link={amazonDealLink}
        title={
          autoDetail?.year +
          ' ' +
          autoDetail?.makeName +
          ' ' +
          autoDetail?.modelName +
          ' Tires'
        }
        subtitle={
          'Find ' +
          autoDetail?.makeName +
          ' tires for all vehicles. Great prices and fast shipping on Amazon'
        }
        icon={'logo-amazon'}
        themeColor={themeColor}
      />
      <View style={{marginTop: SPACING.space_8}}>
        <BannerAds type="RectangleBanner" />
      </View>
    </>
  );
};

export default AutoOptionTireCard;

const styles = StyleSheet.create({
  CardLinearGradient: {
    padding: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_8,
    marginBottom: SPACING.space_10,
  },
  CardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CardSubInfoContainer: {
    alignItems: 'center',
    gap: SPACING.space_10,
  },
  TextTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
  },
  TextSubTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
  },
  cardGuideAiContainer: {
    marginVertical: SPACING.space_20,
  },
});

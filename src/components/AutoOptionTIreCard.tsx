import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {showToast, pressureConverter} from '../utils/common';
import {CommonActions} from '@react-navigation/native';
import {useOfflineStore} from '../store/offline-store';

interface AutoOptionTireCardProps {
  themeColor: any;
  navigation: any;
  targetScreen: string;
  getNavigationParams: (item: any) => any;
  item: any;
  t: any;
  addAutoUserTire: any;
}

const AutoOptionTireCard: React.FC<AutoOptionTireCardProps> = ({
  themeColor,
  navigation,
  targetScreen,
  getNavigationParams,
  item,
  t,
  addAutoUserTire,
}) => {
  const Settings = useOfflineStore((state: any) => state.Settings);
  const pressureUnit = Settings.pressureUnit;
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
    <TouchableOpacity
      onPress={handleAddAutoTire}
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
  );
};

export default AutoOptionTireCard;

const styles = StyleSheet.create({
  CardLinearGradient: {
    padding: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_8,
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
});

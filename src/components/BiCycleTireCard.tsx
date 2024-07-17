import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {showToast, pressureConverter} from '../utils/common';
import {CommonActions} from '@react-navigation/native';
import {useOfflineStore} from '../store/offline-store';

interface BiCycleTireCardProps {
  themeColor: any;
  navigation: any;
  item: any;
  t: any;
  userDetail: any;
  addBicycleUserTire: any;
}

const BiCycleTireCard: React.FC<BiCycleTireCardProps> = ({
  themeColor,
  navigation,
  item,
  t,
  userDetail,
  addBicycleUserTire,
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
          await addBicycleUserTire(
            item?.front_tire_pressure,
            item?.front_tire_size,
            item?.rear_tire_pressure,
            item?.rear_tire_size,
            item?.rider_weight,
            item?.ride_condition,
            item?.weight_unit,
            item?.tubeless_tire,
            userDetail,
          );
          navigation.navigate('MyVehicleScreen', {});
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'AddUserTireScreen'}],
            }),
          );
          showToast(t('addedToMyGarage'), 'success');
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
            {item.rear_tire_size} mm
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
            {item.front_tire_size} mm
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BiCycleTireCard;

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
});

import React, {memo} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import {useOfflineStore} from '../store/offline-store';
import {pressureConverter} from '../utils/common';
import {images} from '../utils/mapping';

interface AutoTirePressureCardProps {
  id: string;
  index: number;
  title: string;
  year: string;
  front_tire_size: string;
  front_tire_pressure: string;
  rear_tire_size: string;
  rear_tire_pressure: string;
  type: string;
  themeColor: any;
  navigation: any;
  t: any;
}

const AutoTirePressureCard: React.FC<AutoTirePressureCardProps> = ({
  id,
  index,
  title,
  year,
  front_tire_size,
  front_tire_pressure,
  rear_tire_size,
  rear_tire_pressure,
  type,
  themeColor,
  navigation,
  t,
}) => {
  const Settings = useOfflineStore((state: any) => state.Settings);
  const pressureUnit = Settings.pressureUnit;
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.CardLinearGradient,
          {backgroundColor: themeColor.priamryDarkBg},
        ]}>
        <View style={styles.CardInfoContainer}>
          <View style={styles.CardHeaderContainer}>
            <View style={styles.CardHeaderTextContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.CardTitle, {color: themeColor.secondaryText}]}>
                {title}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.MoreOptionsContainer}
              onPress={() => {
                navigation.navigate('SharedModalScreen', {
                  id: id,
                  title: title,
                });
              }}>
              <Feather
                name="more-horizontal"
                size={24}
                color={themeColor.secondaryText}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={[styles.CardSubTitle, {color: themeColor.secondaryText}]}>
            {year}
          </Text>
          <View style={styles.CardImageContainer}>
            <Image
              source={images[type] || images['Default']}
              style={styles.ImageStyle}
            />
          </View>
          <View style={styles.CardTireInfoContainer}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={[
                  styles.TextSubTitle,
                  {color: themeColor.secondaryText},
                ]}>
                Rear Tire Pressure
              </Text>
              <Text
                style={[styles.TextTitle, {color: themeColor.secondaryText}]}>
                {pressureConverter(rear_tire_pressure, pressureUnit)}
              </Text>
              <Text
                style={[
                  styles.TextSubTitle,
                  {color: themeColor.secondaryText},
                ]}>
                {rear_tire_size}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={[
                  styles.TextSubTitle,
                  {color: themeColor.secondaryText},
                ]}>
                Front Tire Pressure
              </Text>
              <Text
                style={[styles.TextTitle, {color: themeColor.secondaryText}]}>
                {pressureConverter(front_tire_pressure, pressureUnit)}
              </Text>
              <Text
                style={[
                  styles.TextSubTitle,
                  {color: themeColor.secondaryText},
                ]}>
                {front_tire_size}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  CardLinearGradient: {
    padding: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_10,
    marginBottom: SPACING.space_10,
  },
  CardInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  CardHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CardHeaderTextContainer: {
    flex: 1,
  },
  MoreOptionsContainer: {
    marginLeft: SPACING.space_10,
    marginTop: -SPACING.space_10,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    paddingBottom: SPACING.space_10,
  },
  CardSubTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    paddingBottom: SPACING.space_10,
  },
  TextTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
    marginTop: SPACING.space_10,
  },
  TextSubTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    marginTop: SPACING.space_10,
  },
  CardTireInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.space_15,
  },
  CardImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageStyle: {
    marginTop: SPACING.space_10,
    padding: SPACING.space_30,
    maxWidth: '100%',
    height: 80,
    resizeMode: 'contain',
  },
});

export default memo(AutoTirePressureCard);

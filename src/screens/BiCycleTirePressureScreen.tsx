import {
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useOfflineStore} from '../store/offline-store';
import 'intl-pluralrules';
import {useTranslation} from 'react-i18next';
import i18n from '../utils/i18n';
import {Formik} from 'formik';
import * as yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';

// Components
import HeaderBar from '../components/HeaderBar';
import TextInputField from '../components/TextInputField';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Feather from 'react-native-vector-icons/Feather';
import {convertKgToLbs, convertMmToInch} from '../utils/common';
import BiCycleTirePressureCard from '../components/BiCycleTireCard';
import {useStore} from '../store/store';
import {rideConditionData} from '../utils/mapping';

const BiCycleTirePressureScreen = ({route, navigation}: any) => {
  // Store
  const themeColor = useOfflineStore((state: any) => state.themeColor);
  const Settings = useOfflineStore((state: any) => state.Settings);
  const UserDetail = useStore((state: any) => state.UserDetail);
  const addBicycleUserTire = useStore((state: any) => state.addBicycleUserTire);

  // State type definition
  interface BicyclePressure {
    front_tire_pressure: number;
    front_tire_size: number;
    rear_tire_pressure: number;
    rear_tire_size: number;
    rider_weight: number;
    ride_condition: string;
    weight_unit: boolean;
    tubeless_tire: boolean;
  }

  // state
  const [bicyclePressure, setBicyclePressure] =
    useState<BicyclePressure | null>(null);

  // Const
  const {t} = useTranslation();

  // Form
  const formRef = useRef<any>(null);
  const initialFormValues = {
    frontTireWidth: 22,
    rearTireWidth: 22,
    rideCondition: 'Normal',
    riderWeight: '',
    weightUnit: false,
    tubelessTire: false,
  };

  // use effect to use language
  useEffect(() => {
    if (Settings.language) {
      i18n.changeLanguage(Settings.language);
    }
  }, [Settings]);

  // Generate tireWidthData dynamically from 19 to 70
  const tireWidthData = Array.from({length: 70 - 19 + 1}, (_, i) => {
    const value = 19 + i;
    return {label: `${value} MM`, value: value};
  });

  // Normalize input
  const normalizeInput = (value: string) => value.replace(',', '.');

  // Yup validation
  const userProfileValidationSchema = yup.object().shape({
    riderWeight: yup
      .number()
      .typeError('* Must be a number')
      .required('* Rider Weight is Required'),
  });

  // Function to calculate pressure in PSI
  const calculatePressure = (
    weight: number,
    width: number,
    isRear: boolean,
    condition: string,
    weightUnit: boolean,
    tubelessTire: boolean = false,
  ) => {
    console.log(weight, width, isRear, condition, weightUnit, tubelessTire);
    const widthInch = Number(convertMmToInch(width));
    let weightLbs = weight;
    if (!weightUnit) {
      weightLbs = Number(convertKgToLbs(weight));
    }

    const weightDistributionFactor = isRear ? 0.6 : 0.4;

    let conditionFactor = 1;
    switch (condition) {
      case 'Long Duration':
        conditionFactor = 0.95;
        break;
      case 'Wet Roads':
        conditionFactor = 0.9;
        break;
      case 'Cold':
        conditionFactor = 1.1;
        break;
      default:
        conditionFactor = 1;
    }

    console.log(
      weightLbs,
      widthInch,
      isRear,
      condition,
      weightUnit,
      tubelessTire,
    );

    let pressure =
      ((weightLbs * weightDistributionFactor) / widthInch) * conditionFactor;

    // Adjust for tubeless tires
    if (tubelessTire) {
      pressure = pressure * 0.85;
    }
    return Number(pressure.toFixed(0));
  };

  return (
    <View
      style={[styles.ScreenContainer, {backgroundColor: themeColor.primaryBg}]}>
      <StatusBar backgroundColor={themeColor.primaryBg}></StatusBar>

      {/* App Header */}
      <HeaderBar
        title={t('biCycleTirePressure')}
        themeColor={themeColor}
        backButton={() => {
          navigation.navigate('AddUserTireScreen');
        }}
      />

      {/* User Profile */}
      <Formik
        innerRef={formRef}
        initialValues={initialFormValues}
        validationSchema={userProfileValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values, actions) => {
          try {
            const frontPressure = calculatePressure(
              Number(values.riderWeight),
              values.frontTireWidth,
              false,
              values.rideCondition,
              values.weightUnit,
              values.tubelessTire,
            );
            const rearPressure = calculatePressure(
              Number(values.riderWeight),
              values.frontTireWidth,
              true,
              values.rideCondition,
              values.weightUnit,
              values.tubelessTire,
            );
            if (frontPressure > 0 && rearPressure > 0) {
              setBicyclePressure({
                front_tire_pressure: frontPressure,
                front_tire_size: values.frontTireWidth,
                rear_tire_pressure: rearPressure,
                rear_tire_size: values.rearTireWidth,
                rider_weight: Number(values.riderWeight),
                ride_condition: values.rideCondition,
                weight_unit: values.weightUnit,
                tubeless_tire: values.tubelessTire,
              });
            }
          } catch (error) {
            console.error('Error calculating tire pressure', error);
          } finally {
          }
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
        }) => (
          <View>
            {/* Front Tire Width */}
            <View
              style={[
                styles.InputContainerComponent,
                {backgroundColor: themeColor.priamryDarkBg},
              ]}>
              <View style={styles.titleContainer}>
                <Text style={{color: themeColor.secondaryText}}>
                  {t('frontTireWidth')}
                </Text>
              </View>
              <RNPickerSelect
                items={tireWidthData}
                onValueChange={value => {
                  setFieldValue('frontTireWidth', value);
                }}
                value={values.frontTireWidth}
                style={{
                  ...pickerSelectStyles,
                  inputIOS: {
                    ...pickerSelectStyles.inputIOS,
                    color: themeColor.secondaryText,
                  },
                  inputAndroid: {
                    ...pickerSelectStyles.inputAndroid,
                    color: themeColor.secondaryText,
                  },
                }}
                placeholder={{}}
                Icon={() => {
                  return (
                    <Feather
                      name="chevron-right"
                      size={20}
                      color={themeColor.secondaryText}
                      style={styles.pickerIcon}
                    />
                  );
                }}
              />
            </View>

            {/* Rear Tire Width */}
            <View
              style={[
                styles.InputContainerComponent,
                {backgroundColor: themeColor.priamryDarkBg},
              ]}>
              <View style={styles.titleContainer}>
                <Text style={{color: themeColor.secondaryText}}>
                  {t('rearTireWidth')}
                </Text>
              </View>
              <RNPickerSelect
                items={tireWidthData}
                onValueChange={value => {
                  setFieldValue('rearTireWidth', value);
                }}
                value={values.rearTireWidth}
                style={{
                  ...pickerSelectStyles,
                  inputIOS: {
                    ...pickerSelectStyles.inputIOS,
                    color: themeColor.secondaryText,
                  },
                  inputAndroid: {
                    ...pickerSelectStyles.inputAndroid,
                    color: themeColor.secondaryText,
                  },
                }}
                placeholder={{}}
                Icon={() => {
                  return (
                    <Feather
                      name="chevron-right"
                      size={20}
                      color={themeColor.secondaryText}
                      style={styles.pickerIcon}
                    />
                  );
                }}
              />
            </View>

            {/* Ride Condition */}
            <View
              style={[
                styles.InputContainerComponent,
                {backgroundColor: themeColor.priamryDarkBg},
              ]}>
              <View style={styles.titleContainer}>
                <Text style={{color: themeColor.secondaryText}}>
                  {t('rideCondition')}
                </Text>
              </View>
              <RNPickerSelect
                items={rideConditionData}
                onValueChange={value => {
                  setFieldValue('rideCondition', value);
                }}
                value={values.rideCondition}
                style={{
                  ...pickerSelectStyles,
                  inputIOS: {
                    ...pickerSelectStyles.inputIOS,
                    color: themeColor.secondaryText,
                  },
                  inputAndroid: {
                    ...pickerSelectStyles.inputAndroid,
                    color: themeColor.secondaryText,
                  },
                }}
                placeholder={{}}
                Icon={() => {
                  return (
                    <Feather
                      name="chevron-right"
                      size={20}
                      color={themeColor.secondaryText}
                      style={styles.pickerIcon}
                    />
                  );
                }}
              />
            </View>

            {/* Kg / Lbs options */}
            <View style={styles.outerContainer}>
              <View style={styles.switchContainer}>
                <Text
                  style={[
                    styles.switchLabel,
                    {color: themeColor.secondaryText},
                  ]}>
                  Kg
                </Text>
                <Switch
                  trackColor={{
                    false: themeColor.primaryBgLight,
                    true: themeColor.primaryTextFocus,
                  }}
                  thumbColor={
                    values.weightUnit
                      ? themeColor.secondaryText
                      : themeColor.secondaryText
                  }
                  ios_backgroundColor={themeColor.priamryDarkBg}
                  onValueChange={value => {
                    setFieldValue('weightUnit', value);
                  }}
                  value={values.weightUnit}
                  style={styles.switch}
                />
                <Text
                  style={[
                    styles.switchLabel,
                    {color: themeColor.secondaryText},
                  ]}>
                  Lbs
                </Text>
              </View>
            </View>

            {/* Rider Weight */}
            <TextInputField
              value={values.riderWeight}
              handleOnChageText={(value: string) => {
                const normalizedValue = normalizeInput(value);
                setFieldValue('riderWeight', normalizedValue);
              }}
              placeholder={t('enterRiderWeight')}
              error={errors.riderWeight}
              themeColor={themeColor}
              iconText="Rider Weight"
              size="M"
              keyboardType="numeric"
            />

            {/* Tubeless Tire options */}
            <View style={styles.outerContainer}>
              <View style={styles.switchContainer}>
                <Text
                  style={[
                    styles.switchLabel,
                    {color: themeColor.secondaryText},
                  ]}>
                  Tube Tire
                </Text>
                <Switch
                  trackColor={{
                    false: themeColor.primaryBgLight,
                    true: themeColor.primaryTextFocus,
                  }}
                  thumbColor={
                    values.tubelessTire
                      ? themeColor.secondaryText
                      : themeColor.secondaryText
                  }
                  ios_backgroundColor={themeColor.priamryDarkBg}
                  onValueChange={value => {
                    setFieldValue('tubelessTire', value);
                  }}
                  value={values.tubelessTire}
                  style={styles.switch}
                />
                <Text
                  style={[
                    styles.switchLabel,
                    {color: themeColor.secondaryText},
                  ]}>
                  Tubeless Tire
                </Text>
              </View>
            </View>

            <View style={styles.ButtonContainerComponent}>
              <TouchableOpacity
                style={styles.ButtonContainer}
                onPress={() => {
                  handleSubmit();
                }}>
                <Text style={styles.ButtonText}>
                  {t('calculateTirePressure')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      {bicyclePressure ? (
        <View style={styles.pressureCard}>
          <BiCycleTirePressureCard
            item={bicyclePressure}
            themeColor={themeColor}
            navigation={navigation}
            t={t}
            userDetail={UserDetail}
            addBicycleUserTire={addBicycleUserTire}
          />
        </View>
      ) : (
        ''
      )}
    </View>
  );
};

export default BiCycleTirePressureScreen;

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
    marginBottom: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_10,
    paddingHorizontal: SPACING.space_20,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: SPACING.space_20 * 2.5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  pickerIcon: {
    marginVertical: SPACING.space_15,
  },
  outerContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.space_20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.space_8,
  },
  switchLabel: {
    fontSize: FONTSIZE.size_16,
    marginHorizontal: SPACING.space_10,
  },
  switch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
  ButtonContainerComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_20,
  },
  ButtonContainer: {
    backgroundColor: COLORS.primaryOrangeHex,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_20 * 2.5,
    borderRadius: BORDERRADIUS.radius_10,
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  pressureCard: {
    marginHorizontal: SPACING.space_20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: SPACING.space_20 * 2.5,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    marginHorizontal: SPACING.space_20,
  },
  inputAndroid: {
    height: SPACING.space_20 * 2.5,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    marginHorizontal: SPACING.space_20,
  },
});

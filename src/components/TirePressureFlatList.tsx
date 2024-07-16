import {Dimensions, StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import {SPACING} from '../theme/theme';
import EmptyListAnimation from './EmptyListAnimation';
import AutoTirePressureCard from './AutoTirePressureCard';
import {rideConditionData} from '../utils/mapping';
import {findRideConditionLabel} from '../utils/common';

interface TirePressureFlatListProps {
  ListRef: any;
  userTires: any;
  tabBarHeight: any;
  navigation: any;
  themeColor: any;
  t: any;
}

const TirePressureFlatList: React.FC<TirePressureFlatListProps> = ({
  ListRef,
  userTires,
  tabBarHeight,
  navigation,
  themeColor,
  t,
}) => {
  return (
    <View>
      <FlatList
        ref={ListRef}
        horizontal={false}
        ListEmptyComponent={
          <EmptyListAnimation title={t('noVehicleInGarage')} />
        }
        showsVerticalScrollIndicator={false}
        data={userTires}
        contentContainerStyle={styles.FlatListContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          if (item.type == 'Auto') {
            return (
              <AutoTirePressureCard
                id={item.id}
                index={item.index}
                title={item.make + ' ' + item.model}
                year={item.year}
                front_tire_size={item.front_tire_size}
                front_tire_pressure={item.front_tire_pressure}
                rear_tire_pressure={item.rear_tire_pressure}
                rear_tire_size={item.rear_tire_size}
                type={item.type}
                themeColor={themeColor}
                navigation={navigation}
                t={t}
              />
            );
          } else if (item.type == 'Bicycle') {
            return (
              <AutoTirePressureCard
                id={item.id}
                index={item.index}
                title={
                  'F: ' +
                  item.front_tire_size +
                  'mm R: ' +
                  item.rear_tire_size +
                  'mm'
                }
                year={
                  findRideConditionLabel(item.ride_condition) +
                  ' - ' +
                  item.rider_weight +
                  ' ' +
                  item.weight_unit
                }
                front_tire_size={item.front_tire_size + ' mm'}
                front_tire_pressure={item.front_tire_pressure}
                rear_tire_pressure={item.rear_tire_pressure}
                rear_tire_size={item.rear_tire_size + ' mm'}
                type={item.type}
                themeColor={themeColor}
                navigation={navigation}
                t={t}
              />
            );
          } else {
            return null; // Ensure a valid return value for unexpected types
          }
        }}
        style={{marginBottom: tabBarHeight * 1.5}}
      />
    </View>
  );
};

export default TirePressureFlatList;

const styles = StyleSheet.create({
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_20,
    flexGrow: 1,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.1,
  },
  dropdownButtonContainer: {
    alignItems: 'flex-end',
  },
  showMoreIcon: {
    paddingHorizontal: SPACING.space_20,
  },
});

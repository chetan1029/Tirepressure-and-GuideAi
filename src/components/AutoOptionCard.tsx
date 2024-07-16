import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface AutoOptionCardProps {
  themeColor: any;
  navigation: any;
  targetScreen: string;
  getNavigationParams: (item: any) => any;
  item: any;
}

const AutoOptionCard: React.FC<AutoOptionCardProps> = ({
  themeColor,
  navigation,
  targetScreen,
  getNavigationParams,
  item,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(targetScreen, getNavigationParams(item));
      }}
      style={[
        styles.CardLinearGradient,
        {backgroundColor: themeColor.priamryDarkBg},
      ]}>
      <View style={styles.CardInfoContainer}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="car-outline"
            size={18}
            color={themeColor.secondaryText}
          />
        </View>
        <Text style={[styles.CardTitle, {color: themeColor.secondaryText}]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AutoOptionCard;

const styles = StyleSheet.create({
  CardLinearGradient: {
    padding: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_8,
  },
  CardInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
  },
});

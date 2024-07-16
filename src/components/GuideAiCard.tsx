import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface GuideAiCardProps {
  themeColor: any;
  navigation: any;
  targetScreen: string;
  getNavigationParams: (item: any) => any;
  item: any;
}

const GuideAiCard: React.FC<GuideAiCardProps> = ({
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
            size={16}
            color={themeColor.secondaryText}
          />
        </View>
        <Text style={[styles.CardTitle, {color: themeColor.secondaryText}]}>
          {item.prompt}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GuideAiCard;

const styles = StyleSheet.create({
  CardLinearGradient: {
    padding: SPACING.space_15,
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
    fontSize: FONTSIZE.size_14,
  },
});

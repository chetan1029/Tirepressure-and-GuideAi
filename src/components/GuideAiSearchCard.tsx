import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BORDERRADIUS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface GuideAiSearchCardProps {
  themeColor: any;
  navigation: any;
  targetScreen: string;
  getNavigationParams: (item: any, guideId: string) => any;
  item: any;
  searchViaGuideAi: any;
  userDetail: any;
}

const GuideAiSearchCard: React.FC<GuideAiSearchCardProps> = ({
  themeColor,
  navigation,
  targetScreen,
  getNavigationParams,
  item,
  searchViaGuideAi,
  userDetail,
}) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        const guideId = await searchViaGuideAi(
          item.prompt,
          item.type,
          userDetail,
        );
        navigation.navigate(targetScreen, getNavigationParams(item, guideId));
      }}
      style={[styles.CardLinearGradient]}>
      <View style={styles.CardInfoContainer}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="sparkles-outline"
            size={16}
            color={themeColor.primaryTextFocus}
          />
        </View>
        <Text style={[styles.CardTitle, {color: themeColor.primaryTextFocus}]}>
          "{item.prompt}" - Search via Guide Ai
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GuideAiSearchCard;

const styles = StyleSheet.create({
  CardLinearGradient: {
    padding: SPACING.space_20,
    marginHorizontal: SPACING.space_20,
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

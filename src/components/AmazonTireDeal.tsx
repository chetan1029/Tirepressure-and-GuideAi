import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface AmazonTireDealProp {
  link: string;
  title: string;
  subtitle: string;
  icon: string;
  themeColor: any;
}

const AmazonTireDeal: React.FC<AmazonTireDealProp> = ({
  link,
  title,
  subtitle,
  icon,
  themeColor,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(link);
      }}
      style={[
        styles.CardLinearGradient,
        {backgroundColor: themeColor.priamryDarkBg},
      ]}>
      <View style={styles.CardInfoContainer}>
        <View style={styles.CardImageInfoContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name={icon} size={34} color={themeColor.secondaryText} />
          </View>
          <View style={styles.CardDetailInfoContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.CardTitle, {color: themeColor.secondaryText}]}>
              {title}
            </Text>

            <Text
              style={[styles.CardSubTitle, {color: themeColor.secondaryText}]}>
              {subtitle}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AmazonTireDeal;

const styles = StyleSheet.create({
  CardLinearGradient: {
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
  },
  CardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CardImageInfoContainer: {
    flexDirection: 'row',
    gap: SPACING.space_15,
    alignItems: 'center',
  },
  iconContainer: {
    padding: SPACING.space_10,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_8,
  },
  CardDetailInfoContainer: {
    flexDirection: 'column',
    gap: SPACING.space_4,
    maxWidth: Dimensions.get('window').width - 150,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    maxWidth: '100%',
  },
  CardSubTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    maxWidth: '100%',
  },
});

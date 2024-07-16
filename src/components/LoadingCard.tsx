import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

interface LoadingCardProps {
  title: string;
}

const LoadingCard: React.FC<LoadingCardProps> = ({title}) => {
  return (
    <View>
      <LottieView
        style={styles.LottieStyle}
        source={require('../lottie/loadingbar.json')}
        autoPlay
        loop
      />
      {title && <Text style={styles.LottieText}>{title}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  LottieStyle: {
    height: 100,
    marginVertical: SPACING.space_40,
  },
  LottieText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});

export default LoadingCard;

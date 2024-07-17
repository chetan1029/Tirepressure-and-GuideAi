import React, {useRef} from 'react';
import {Platform} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  useForeground,
} from 'react-native-google-mobile-ads';
import {SPACING} from '../theme/theme';

const BannerAds = () => {
  const bannerRef = useRef<BannerAd>(null);

  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  return (
    <View style={styles.AdsContainer}>
      <BannerAd
        ref={bannerRef}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        unitId="ca-app-pub-2440162144079254/5133807254"
        onAdLoaded={() => {
          console.log('Advert loaded');
        }}
        onAdFailedToLoad={error => {
          console.error('Advert failed to load: ', error);
        }}
      />
    </View>
  );
};

export default BannerAds;

const styles = StyleSheet.create({
  AdsContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

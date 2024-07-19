import React, {useRef, useState} from 'react';
import {Platform} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  useForeground,
} from 'react-native-google-mobile-ads';
import {SPACING} from '../theme/theme';

interface BannerAdsProps {
  type?: string;
}

const BannerAds: React.FC<BannerAdsProps> = ({type}) => {
  const bannerRef = useRef<BannerAd>(null);
  const [adFailedToLoad, setAdFailedToLoad] = useState(false);

  useForeground(() => {
    Platform.OS === 'ios' && bannerRef.current?.load();
  });

  let bannerType = BannerAdSize.BANNER;

  if (type == 'FullBanner') {
    bannerType = BannerAdSize.MEDIUM_RECTANGLE;
  } else if (type == 'RectangleBanner') {
    bannerType = BannerAdSize.MEDIUM_RECTANGLE;
  }

  return (
    <View style={styles.AdsContainer}>
      {!adFailedToLoad ? (
        <BannerAd
          ref={bannerRef}
          size={bannerType}
          unitId="ca-app-pub-2440162144079254/5133807254"
          onAdLoaded={() => {
            //console.log('Advert loaded');
          }}
          onAdFailedToLoad={error => {
            //console.log('Advert failed to load: ', error);
            setAdFailedToLoad(true);
          }}
        />
      ) : (
        <BannerAd
          ref={bannerRef}
          size={BannerAdSize.BANNER}
          unitId="ca-app-pub-2440162144079254/5133807254"
          onAdLoaded={() => {
            //console.log('Advert loaded');
          }}
          onAdFailedToLoad={error => {
            //console.log('Advert failed to load: ', error);
          }}
        />
      )}
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

import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useOfflineStore} from '../store/offline-store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import 'intl-pluralrules';
import {useTranslation} from 'react-i18next';
import i18n from '../utils/i18n';
import {useStore} from '../store/store';
import firestore from '@react-native-firebase/firestore';

// Components
import HeaderBar from '../components/HeaderBar';
import LoadingCard from '../components/LoadingCard';
import GuideAiDetailCard from '../components/GuideAiDetailCard';

const GuideAiDetailScreen = ({route, navigation}: any) => {
  // State
  const [loading, setLoading] = useState(false);
  const [guideAiDetail, setGuideAiDetail] = useState<any>({});

  // Store
  const themeColor = useOfflineStore((state: any) => state.themeColor);
  const Settings = useOfflineStore((state: any) => state.Settings);
  const UserDetail = useStore((state: any) => state.UserDetail);

  // Other variables
  const tabBarHeight = useBottomTabBarHeight();

  // Const
  const {t} = useTranslation();

  const item = route?.params;

  // use effect to use language
  useEffect(() => {
    if (Settings.language) {
      i18n.changeLanguage(Settings.language);
    }
  }, [Settings]);

  // Use effect to subscribe to changes in Firestore
  useEffect(() => {
    if (item?.type && item?.type == 'user-history') {
      if (!UserDetail || !UserDetail.uid || !item?.guideId) {
        return;
      }

      const unsubscribe = firestore()
        .collection('guideAi')
        .doc(item.guideId)
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            const modifiedData = snapshot.data();
            setGuideAiDetail(modifiedData); // Update state with modified data
          } else {
            setGuideAiDetail({}); // Handle case where document doesn't exist
          }
        });

      // Clean up the listener when component unmounts
      return () => {
        unsubscribe();
      };
    } else if (item?.type && item?.type == 'no-keywordMatch') {
      setGuideAiDetail(item);
    } else {
      setGuideAiDetail(item.item);
    }
  }, [item, UserDetail]);

  return (
    <View
      style={[styles.ScreenContainer, {backgroundColor: themeColor.primaryBg}]}>
      <StatusBar backgroundColor={themeColor.primaryBg}></StatusBar>

      {/* App Header */}
      <HeaderBar
        title={t('tireGuideAi')}
        themeColor={themeColor}
        backButton={() => {
          navigation.navigate('GuideAiScreen');
        }}
      />
      {loading ? (
        <LoadingCard title={item?.prompt} />
      ) : (
        <GuideAiDetailCard
          themeColor={themeColor}
          item={guideAiDetail}
          tabBarHeight={tabBarHeight}
          t={t}
        />
      )}
    </View>
  );
};

export default GuideAiDetailScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

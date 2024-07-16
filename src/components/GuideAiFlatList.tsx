import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import {SPACING} from '../theme/theme';
import EmptyListAnimation from './EmptyListAnimation';
import GuideAiCard from './GuideAiCard';
import EmptySharedWishList from './EmptySharedWishList';

interface GuideAiFlatListProps {
  ListRef: any;
  guideAiList: any;
  tabBarHeight: any;
  navigation: any;
  themeColor: any;
  targetScreen: string;
  getNavigationParams: (item: any) => any;
  t: any;
  addUserTire?: any;
}

const GuideAiFlatList: React.FC<GuideAiFlatListProps> = ({
  ListRef,
  guideAiList,
  tabBarHeight,
  navigation,
  themeColor,
  targetScreen,
  getNavigationParams,
  t,
  addUserTire,
}) => {
  return (
    <View>
      <FlatList
        ref={ListRef}
        horizontal={false}
        ListEmptyComponent={
          <EmptyListAnimation title={t('noSearchInHistory')} />
        }
        showsVerticalScrollIndicator={false}
        data={guideAiList}
        contentContainerStyle={styles.FlatListContainer}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({item}) => {
          return (
            <GuideAiCard
              themeColor={themeColor}
              navigation={navigation}
              targetScreen="GuideAiDetailScreen"
              getNavigationParams={() => ({item})}
              item={item}
            />
          );
        }}
        style={{marginBottom: tabBarHeight * 2.4}}
      />
    </View>
  );
};

export default GuideAiFlatList;

const styles = StyleSheet.create({
  FlatListContainer: {
    gap: SPACING.space_8,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_20,
    flexGrow: 1,
  },
});

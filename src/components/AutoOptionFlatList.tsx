import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import {SPACING} from '../theme/theme';
import EmptyListAnimation from './EmptyListAnimation';
import AutoOptionCard from './AutoOptionCard';
import AutoOptionTireCard from './AutoOptionTIreCard';

interface AutoOptionFlatListProps {
  ListRef: any;
  userTires: any;
  tabBarHeight: any;
  navigation: any;
  themeColor: any;
  targetScreen: string;
  getNavigationParams: (item: any) => any;
  searchViaGuideAi: any;
  userDetail: any;
  t: any;
  addAutoUserTire?: any;
}

const AutoOptionFlatList: React.FC<AutoOptionFlatListProps> = ({
  ListRef,
  userTires,
  tabBarHeight,
  navigation,
  themeColor,
  targetScreen,
  getNavigationParams,
  searchViaGuideAi,
  userDetail,
  t,
  addAutoUserTire,
}) => {
  return (
    <View>
      <FlatList
        ref={ListRef}
        horizontal={false}
        ListEmptyComponent={<EmptyListAnimation title={t('noResultFound')} />}
        showsVerticalScrollIndicator={false}
        data={userTires}
        contentContainerStyle={styles.FlatListContainer}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({item}) => {
          return targetScreen ? (
            <AutoOptionCard
              themeColor={themeColor}
              navigation={navigation}
              targetScreen={targetScreen}
              getNavigationParams={getNavigationParams}
              item={item}
            />
          ) : (
            <AutoOptionTireCard
              themeColor={themeColor}
              navigation={navigation}
              targetScreen={targetScreen}
              getNavigationParams={getNavigationParams}
              item={item}
              searchViaGuideAi={searchViaGuideAi}
              userDetail={userDetail}
              t={t}
              addAutoUserTire={addAutoUserTire}
            />
          );
        }}
        style={{marginBottom: tabBarHeight * 3}}
      />
    </View>
  );
};

export default AutoOptionFlatList;

const styles = StyleSheet.create({
  FlatListContainer: {
    gap: SPACING.space_8,
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_20,
    flexGrow: 1,
  },
});

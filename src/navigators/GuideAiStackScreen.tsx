import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GuideAiScreen from '../screens/GuideAiScreen';
import GuideAiDetailScreen from '../screens/GuideAiDetailScreen';

const GuideAiStack = createStackNavigator();

function GuideAiStackScreen() {
  return (
    <GuideAiStack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerShown: false,
      }}>
      <GuideAiStack.Screen
        name="GuideAiScreen"
        component={GuideAiScreen}
        initialParams={{type: 'general'}}
      />
      <GuideAiStack.Screen
        name="GuideAiDetailScreen"
        component={GuideAiDetailScreen}
      />
    </GuideAiStack.Navigator>
  );
}

export default GuideAiStackScreen;

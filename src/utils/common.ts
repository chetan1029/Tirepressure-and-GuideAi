import Toast from 'react-native-toast-message';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import { Linking } from 'react-native';
import { rideConditionData } from './mapping';
import {remoteConfig} from './remoteConfig';

const amazonDealLink = "https://amzn.to/4cXPRNd"


const showToast = (message: string, type: string) => {
  Toast.show({
    type: type,
    text1: message,
    visibilityTime: 1000,
    position: 'bottom',
  });
};

const isConnectedToNetwork = async () => {
  try {
    const state = await NetInfo.fetch();
    if (state.isConnected !== null && state.isConnected !== undefined) {
      return state.isConnected;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking network connection:", error);
    return false;
  }
};

const openLink = async (url: string) => {
  if (url) {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          // Open the URL in the browser
          Linking.openURL(url);
        } else {
          console.error("Don't know how to open URI: " + url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  }
};

const convertPsiToKpa = (psi: any) => (psi * 6.89476).toFixed(2);
const convertPsiToBar = (psi: any) => (psi * 0.0689476).toFixed(2);

const pressureConverter = (psi: any, unit: string) => {
  if(psi){
    if(unit == "KPa"){
      return convertPsiToKpa(psi).toString()+" KPa";
    }else if(unit == "BAR"){
      return convertPsiToBar(psi).toString()+" Bar";
    }else{
      return psi.toString()+" PSI";
    }
  }else{
    return "N/A";
  }
}

const convertMmToInch = (mm: any) => (mm / 25.4).toFixed(2);
const convertKgToLbs = (kg: any) => (kg * 2.20462).toFixed(2);

// Function to find label based on value
const findRideConditionLabel = (value: string): string | undefined => {
  const condition = rideConditionData.find((data) => data.value === value);
  return condition ? condition.label : undefined;
};

const fetchKeywords = async () => {
  try {
    await remoteConfig().fetchAndActivate();
    const keywordsString = remoteConfig().getValue('ai_keywords').asString();
    // Check if the fetched string is valid JSON
    const keywords = keywordsString ? JSON.parse(keywordsString) : [];
    return Array.isArray(keywords["keywords"]) ? keywords["keywords"] : [];
  } catch (error) {
    console.error('Error fetching remote config:', error);
    return [];
  }
};

const filterAiPrompt = async(prompt: string) => {
  try {
  // Convert the prompt to lowercase to ensure case-insensitive matching
  const lowerCasePrompt = prompt.toLowerCase();
  const keywords = await fetchKeywords();

  // Check if any keyword is present in the prompt
  const matchedKeywords = keywords.filter((keyword: string) => lowerCasePrompt.includes(keyword.toLowerCase()));

  // Return the result
  return matchedKeywords.length > 0
} catch (error) {
  console.error('Error in filterAiPrompt:', error);
  return false;
}
};

export {showToast, isConnectedToNetwork, openLink, pressureConverter, convertMmToInch, convertKgToLbs, findRideConditionLabel, filterAiPrompt, amazonDealLink};
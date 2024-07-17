import Toast from 'react-native-toast-message';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import { Linking } from 'react-native';
import { rideConditionData } from './mapping';


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
  if(unit == "KPa"){
    return convertPsiToKpa(psi).toString()+" KPa";
  }else if(unit == "BAR"){
    return convertPsiToBar(psi).toString()+" Bar";
  }else{
    return psi.toString()+" PSI";
  }
}

const convertMmToInch = (mm: any) => (mm / 25.4).toFixed(2);
const convertKgToLbs = (kg: any) => (kg * 2.20462).toFixed(2);

// Function to find label based on value
const findRideConditionLabel = (value: string): string | undefined => {
  const condition = rideConditionData.find((data) => data.value === value);
  return condition ? condition.label : undefined;
};

const amazonDealLink = "https://amzn.to/4cXPRNd"

export {showToast, isConnectedToNetwork, openLink, pressureConverter, convertMmToInch, convertKgToLbs, findRideConditionLabel, amazonDealLink};
import {create} from 'zustand';
import {
  fetchUserTiresFromFirebase, 
  deleteUserTiresInFirebase, 
  addAutoUserTiresInFirebase, 
  addBicycleUserTiresInFirebase,
  deleteUserTiresByUserInFirebase,
  fetchAutoMakeFromFirebase,
  fetchAutoModelFromFirebase,
  fetchAutoYearFromFirebase,
  fetchGuideAiFromFirebase,
  searchViaGuideAiFromFirebase,
  fetchGuideAiItemFromFirebase,
  fetchTireDealItemsFromFirebase,
  fetchMotoMakeFromFirebase,
  fetchMotoModelFromFirebase,
  fetchMotoYearFromFirebase,
} from "./firebase-functions";
import { AlertMessageDetailItem, SettingsType, UserType, UserTiresItem, AutoMakeItem, AutoModelItem, AutoYearItem, GuideAiItem, TireDealItem } from './types';
import { isConnectedToNetwork, showToast } from '../utils/common';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StoreState {
  UserDetail: any;
  AutoMake: AutoMakeItem[];
  AutoModel: AutoModelItem[];
  AutoYear: AutoYearItem[];
  MotoMake: AutoMakeItem[];
  MotoModel: AutoModelItem[];
  MotoYear: AutoYearItem[];
  UserTiresItems: UserTiresItem[];
  GuideAiItems: GuideAiItem[];
  GuideAiSearchItem: GuideAiItem | null;
  AlertMessageDetails: { title: string, message: string, action: any};
  Settings: SettingsType;
  TireDealItems: TireDealItem[];
  setUserDetail: (user: any) => void;
  fetchAutoMake: () => Promise<void>;
  fetchAutoModel: (makeId: string) => Promise<void>;
  fetchAutoYear: (makeId: string, modelId: string) => Promise<void>;
  fetchMotoMake: () => Promise<void>;
  fetchMotoModel: (makeId: string) => Promise<void>;
  fetchMotoYear: (makeId: string, modelId: string) => Promise<void>;
  fetchUserTires: (user: any) => Promise<void>;
  fetchGuideAiItems: (type: string, user: any) => Promise<void>;
  searchViaGuideAi: (prompt: string, type: string, user: any) => Promise<string>;
  fetchGuideAiSearchItem: (id: string) => Promise<void>;
  deleteFromUserTires: (id: string, user:any) => Promise<void>;
  addAutoUserTire: (make: string, model: string, year: string, frontTirePressure: string, frontTireSize: string, rearTirePressure: string, rearTireSize: string, user:any) => Promise<void>;
  addBicycleUserTire: (frontTirePressure: number, frontTireSize: number, rearTirePressure: number, rearTireSize: number, riderWeight: number, rideCondition: string, weightUnit: string, tubelessTire: boolean, user:any) => Promise<void>;
  updateSettings: (settings: SettingsType) => Promise<void>;
  deleteUserTiresByUser: (user: any) => Promise<void>;
  fetchTireDealItems: () => Promise<void>;
}


export const useStore = create<StoreState>(
  (set, get) => ({
      UserDetail: null,
      AutoMake: [],
      AutoModel: [],
      AutoYear: [],
      MotoMake: [],
      MotoModel: [],
      MotoYear: [],
      UserTiresItems: [],
      GuideAiItems: [],
      GuideAiSearchItem: {
        id: '',
        prompt: '',
        response: undefined,
        type: ''
      },
      AlertMessageDetails: {title: '', message: '', action: ''},
      Settings: {themeMode: "Automatic", language: "English"},
      TireDealItems:[],
      setUserDetail: async(user: any) => {
        set({UserDetail: user})
      },
      fetchAutoMake: async () => {
        try {
            const autoMake = await fetchAutoMakeFromFirebase();
            set({AutoMake: autoMake});
        } catch (error) {
          console.error("Error fetching make data", error);
        }
      },
      fetchAutoModel: async (makeId: string) => {
        try {
            const autoModel = await fetchAutoModelFromFirebase(makeId);
            set({AutoModel: autoModel});
        } catch (error) {
          console.error("Error fetching model data", error);
        }
      },
      fetchAutoYear: async (makeId: string, modelId: string) => {
        try {
            const autoYear = await fetchAutoYearFromFirebase(makeId, modelId);
            set({AutoYear: autoYear});
        } catch (error) {
          console.error("Error fetching year data", error);
        }
      },
      fetchMotoMake: async () => {
        try {
            const motoMake = await fetchMotoMakeFromFirebase();
            set({MotoMake: motoMake});
        } catch (error) {
          console.error("Error fetching make data", error);
        }
      },
      fetchMotoModel: async (makeId: string) => {
        try {
            const motoModel = await fetchMotoModelFromFirebase(makeId);
            set({MotoModel: motoModel});
        } catch (error) {
          console.error("Error fetching model data", error);
        }
      },
      fetchMotoYear: async (makeId: string, modelId: string) => {
        try {
            const motoYear = await fetchMotoYearFromFirebase(makeId, modelId);
            set({MotoYear: motoYear});
        } catch (error) {
          console.error("Error fetching year data", error);
        }
      },
      fetchUserTires: async (user: any) => {
        try {
          if (user?.uid) {
            const userTires = await fetchUserTiresFromFirebase(user?.uid);
            set({UserTiresItems: userTires});
          }else {
            set({ UserTiresItems: [] });
          }
        } catch (error) {
          console.error("Error fetching tire data", error);
        }
      },
      fetchGuideAiItems: async (type: string, user:any) => {
        try {
          const guideAiItems = await fetchGuideAiFromFirebase(type, user?.uid);
          set({GuideAiItems: guideAiItems});
        } catch (error) {
          console.error("Error fetching guide AI data", error);
        }
      },
      searchViaGuideAi: async (prompt: string, type: string, user: any) => {
        try {
          const guideAiId = await searchViaGuideAiFromFirebase(prompt, type, user?.uid);
          return guideAiId
        } catch (error) {
          console.error("Error looking for guide AI", error);
          return ''
        }
      },
      fetchGuideAiSearchItem: async (guideId: string) => {
        try {
          const guideAiItem = await fetchGuideAiItemFromFirebase(guideId);
          set({GuideAiSearchItem: guideAiItem});
        } catch (error) {
          console.error("Error fetching guide AI data", error);
        }
      },
      deleteFromUserTires: async(id: string, user:any) => {
        try {
          await deleteUserTiresInFirebase(id, user.uid);
          
          // Fetch updated wishlist items from Firebase
          await get().fetchUserTires(user);
        } catch (error) {
          console.error("Error delete user tire", error);
        }
      },
      addAutoUserTire: async(make: string, model: string, year: string, frontTirePressure: string, frontTireSize: string, rearTirePressure: string, rearTireSize: string, user:any) => {
        try {
          await addAutoUserTiresInFirebase(make, model, year, frontTirePressure, frontTireSize, rearTirePressure, rearTireSize, "Auto", user.uid);

          // Fetch updated wishlist items from Firebase
          await get().fetchUserTires(user);
        } catch (error: any) {
          if (error.message === "No internet connection") {
            // TODO: we can show a toast message that
            showToast(`No Internet Connection: we will update data once you are back online`, 'info');
          }else {
            console.error("Error Adding auto user tires:", error);
          }
        }
      },
      addMotoUserTire: async(make: string, model: string, year: string, frontTirePressure: string, frontTireSize: string, rearTirePressure: string, rearTireSize: string, user:any) => {
        try {
          await addAutoUserTiresInFirebase(make, model, year, frontTirePressure, frontTireSize, rearTirePressure, rearTireSize, "Motorcycle", user.uid);

          // Fetch updated wishlist items from Firebase
          await get().fetchUserTires(user);
        } catch (error: any) {
          if (error.message === "No internet connection") {
            // TODO: we can show a toast message that
            showToast(`No Internet Connection: we will update data once you are back online`, 'info');
          }else {
            console.error("Error Adding motorcycle user tires:", error);
          }
        }
      },
      addBicycleUserTire: async(frontTirePressure: number, frontTireSize: number, rearTirePressure: number, rearTireSize: number, riderWeight: number, rideCondition: string, weightUnit: string, tubelessTire: boolean, user:any) => {
        try {
          await addBicycleUserTiresInFirebase(frontTirePressure, frontTireSize, rearTirePressure, rearTireSize, riderWeight, rideCondition, weightUnit, tubelessTire, user.uid);

          // Fetch updated wishlist items from Firebase
          await get().fetchUserTires(user);
        } catch (error: any) {
          if (error.message === "No internet connection") {
            // TODO: we can show a toast message that
            showToast(`No Internet Connection: we will update data once you are back online`, 'info');
          }else {
            console.error("Error Adding bicycle user tires:", error);
          }
        }
      },
      updateSettings: async(settings: SettingsType) => {
        try {
          await AsyncStorage.setItem('settings', JSON.stringify(settings));
          set({ Settings: settings });
        } catch (error) {
          console.error("Error updating settings", error);
        }
      },
      deleteUserTiresByUser: async(user:any) => {
        try {
          await deleteUserTiresByUserInFirebase(user.uid);
        } catch (error) {
          console.error("Error deleting user tire data by user", error);
        }
      },
      fetchTireDealItems: async () => {
        try {
          const tireDealItems = await fetchTireDealItemsFromFirebase();
          set({TireDealItems: tireDealItems});
        } catch (error) {
          console.error("Error fetching guide AI data", error);
        }
      } 
    }),
  );
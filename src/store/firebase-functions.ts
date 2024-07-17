import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { UserTiresItem, AlertMessageDetailItem, AutoMakeItem, AutoModelItem, AutoYearItem, GuideAiItem, TireDealItem } from './types';

const fetchUserTiresFromFirebase = async(userId: string) => {
    let userTiresItem: any[] = [];
    await firestore().collection('userTires').where("userId", "==" , userId).orderBy('createDate', 'desc').get().then((userTiresSnapshot) => {
        if (!userTiresSnapshot.empty) {
            userTiresItem = userTiresSnapshot.docs.map((doc) => {
                const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                    }});
        }
    });
    return userTiresItem;
}

const deleteUserTiresInFirebase = async(id: string, userId: string) => {
    await firestore().collection('userTires').doc(id).delete();
}

const addAutoUserTiresInFirebase = async(make: string, model: string, year: string, frontTirePressure: string, frontTireSize: string, rearTirePressure: string, rearTireSize: string, userId: string) => {
    const userTireDocRef = await firestore().collection('userTires').add(
        { 
            "type": "Auto", 
            "make": make,
            "model": model, 
            "year": year, 
            "front_tire_pressure": frontTirePressure,
            "front_tire_size": frontTireSize,
            "rear_tire_pressure": rearTirePressure,
            "rear_tire_size": rearTireSize, 
            "createDate": firestore.FieldValue.serverTimestamp(),
            "userId": userId,
        }
    )
    return userTireDocRef.id;
}

const addBicycleUserTiresInFirebase = async(frontTirePressure: number, frontTireSize: number, rearTirePressure: number, rearTireSize: number, riderWeight: number, rideCondition: string, weightUnit: string, tubelessTire: boolean, userId: string) => {
    const userTireDocRef = await firestore().collection('userTires').add(
        { 
            "type": "Bicycle", 
            "front_tire_pressure": frontTirePressure,
            "front_tire_size": frontTireSize,
            "rear_tire_pressure": rearTirePressure,
            "rear_tire_size": rearTireSize, 
            "rider_weight": riderWeight,
            "ride_condition": rideCondition,
            "weight_unit": weightUnit ? "Lbs" : "Kg",
            "tubeless_tire": tubelessTire,
            "createDate": firestore.FieldValue.serverTimestamp(),
            "userId": userId,
        }
    )
    return userTireDocRef.id;
}


const deleteUserTiresByUserInFirebase = async(userId: string) => {
    // Delete in WishList
    const userTiresCollection = await firestore().collection('userTires').where("userId", "==" , userId).get();
    const batch = firestore().batch();
    userTiresCollection.forEach(documentSnapshot => {
        batch.delete(documentSnapshot.ref);
      });
    await batch.commit();
}

// fetch auto Make
const fetchAutoMakeFromFirebase = async() => {
    let autoMakeItem: AutoMakeItem[] = [];
    await firestore().collection('carMakes').get().then((autoMakeSnapshot) => {
        if (!autoMakeSnapshot.empty) {
            autoMakeItem = autoMakeSnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
            }));
        }
    });
    return autoMakeItem;
}

// fetch auto Model
const fetchAutoModelFromFirebase = async(makeId: string) => {
    let autoModelItem: AutoModelItem[] = [];
    await firestore().collection('carMakes').doc(makeId).collection("models").get().then((autoModelSnapshot) => {
        if (!autoModelSnapshot.empty) {
            autoModelItem = autoModelSnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
            }));
        }
    });
    return autoModelItem;
}

// fetch auto Year
const fetchAutoYearFromFirebase = async(makeId: string, modelId: string) => {
    let autoYearItem: AutoYearItem[] = [];
    await firestore().collection('carMakes').doc(makeId).collection("models").doc(modelId).collection("years").get().then((autoYearSnapshot) => {
        if (!autoYearSnapshot.empty) {
            autoYearItem = autoYearSnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().year,
                tireSizes: doc.data().tireSizes,
            }));
        }
    });
    return autoYearItem;
}

// fetch Guide AI
const fetchGuideAiFromFirebase = async(type: string, userId: any) => {
    let guideAiItem: GuideAiItem[] = [];
    let query: FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData> = firestore().collection('guideAi');
    if (type === 'user-history' && userId) {
        query = query.where("type", "==", "user-history").where("userId", "==", userId);
    }else{
        query = query.where("type", "==", "general");
    }
    console.log(type);
    try {
        await query.get().then((guideAiSnapshot) => {
            if (!guideAiSnapshot.empty) {
                guideAiItem = guideAiSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    prompt: doc.data().prompt,
                    response: doc.data().response,
                    type: doc.data().type,
                }));
            }
        });
    } catch (error) {
        console.error("Error fetching guideAi from Firebase:", error);
    }
    return guideAiItem;
}

// search via Guide AI
const searchViaGuideAiFromFirebase = async(prompt: string, type: string, userId: any) => {
    const guideAiDocRef = await firestore().collection('guideAi').add(
        { 
            "type": type, 
            "prompt": prompt,
            "userId": userId,
        }
    )
    return guideAiDocRef.id;
}

// fetch Guide AI Search
const fetchGuideAiItemFromFirebase = async(guideId: string) => {
    try {
        const guideAiSnapshot = await firestore().collection('guideAi').doc(guideId).get();
        
        if (guideAiSnapshot.exists) {
            const data = guideAiSnapshot.data();
            if (data) {
                return {
                    id: guideAiSnapshot.id,
                    prompt: data.prompt,
                    response: data.response,
                    type: data.type
                };
            }
        }

        return null;
    } catch (error) {
        console.error("Error fetching Guide AI item:", error);
        return null;
    }
}

// fetch Tire Deal
const fetchTireDealItemsFromFirebase = async() => {
    let tireDealItem: TireDealItem[] = [];
    await firestore().collection('affiliate').get().then((autoYearSnapshot) => {
        if (!autoYearSnapshot.empty) {
            tireDealItem = autoYearSnapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                subtitle: doc.data().subtitle,
                icon: doc.data().icon,
                type: doc.data().type,
                link: doc.data().link,
            }));
        }
    });
    return tireDealItem;
}


export { 
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
    fetchTireDealItemsFromFirebase
}
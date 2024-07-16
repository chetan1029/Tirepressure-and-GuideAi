export interface UserTiresItem{
    id: string,
    make: string,
    model: string,
    year: string,
    front_tire_pressure: string,
    front_tire_size: string,
    rear_tire_pressure: string,
    rear_tire_size: string,
    type: string,
    createdDate: any,
}

export interface UserType{
    uid: string,
    displayName: string,
    email: string,
    isAnonymous: boolean,
}

export interface SettingsType{
    themeMode: string,
    language: string
}

export interface AlertMessageDetailItem{
    message: string,
    alertType: string,
    action: any,
}

export interface AutoMakeItem{
    id: string,
    name: string
}

export interface AutoModelItem{
    id: string,
    name: string
}

export interface AutoYearItem{
    id: string,
    name: string,
    tireSizes: any[],
}

export interface GuideAiItem{
    id: string,
    prompt: string,
    response: any,
    type: string,
}
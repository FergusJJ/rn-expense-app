/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Auth, User, UserCredential } from 'firebase/auth';
// import { AuthStackParamsList } from './screens/GetStarted/GetStarted';
import { RootStackParamList } from '../navigator/RootNavigator';
import { Timestamp } from 'firebase/firestore';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface RootParamList extends AuthStackParamsList {}
  }
}

/**
 * Global Typings
 */

export type Glyphmap = typeof import("../assets/expoGlyphMaps/ioniconGlyphMap.json")

export enum Themes {
  LIGHT = "LIGHT",
  DARK = "DARK",
  EMPTY = "empty"
}

export enum Currencies {
  GBP = "GBP",
  USD = "USD",
  EUR = "EUR",
  EMPTY = "empty"
}

export const Colors:Array<string> = ["#FF6900","#FCB900", "#7BDCB5", "#8ED1FC", "#0693E3", "#ABB8C3", "#EB144C", "#F78DA7", "#9900EF"]

export type UserContextStruct = {
  isLoggedIn: boolean;
  setIsLoggedIn: Function;
  auth: string | null;
  setAuth:Function;
}

export type AppSettingsContextStruct = {
  theme: Themes;
  setTheme: Function;
  currency: Currencies;
  setCurrency: Function;
  notifications: boolean;
  setNotifications: Function;
}

export type UserDataContextStruct = {
  savedCategories: Array<[string,ExpenseCategoryStruct]>;
  setSavedCategories: Function;
  uid: string;
  setUid: Function;
} 

export type ExpenseCategoryStruct = {
  categoryName: string;
  color: string;
  createdAt: Timestamp;
}

export type AuthState = {
  auth: null | string;
  user: undefined | User;
}

export type AuthAction = {
  payload: AuthActionPayload
}

type AuthActionPayload = {
  user: User;
  auth: string;
}

/**
 * END
 * Global Typings
 */

/**
 * SignUp / Get Started Screens 
 */

export type AuthStackParamsList = {
  LogIn: undefined;//LogInAuthStackProps;
  SignUp: undefined;//SignUpAuthNavigationProps ;
  };

// export type SignUpAuthNavigationProps = {
//   screenHeight: number;
//   screenWidth: number;
//   navigationProp: NativeStackNavigationProp<AuthStackParamsList, "SignUp", undefined>;
//   auth: undefined | Auth;
// }


export type screenProps  = {
    screenHeight: number;
    screenWidth: number;
}

export type LogInAuthStackProps = {
  screenHeight: number;
  screenWidth: number;
  navigationProp: NativeStackNavigationProp<AuthStackParamsList, "LogIn", undefined>
  auth: undefined | Auth;
}

export type FirebaseRegisterAuthResponse = {
  user: User | undefined;
  error: boolean;
  errorCode: string | undefined;
  errorMessage: string | undefined;
}

export type FirebaseNameResponse = {
  error: boolean;
  errorCode: string | undefined;
  errorMessage: string | undefined;
}

export type FirebaseSaveCategoryResponse = {
  success: boolean;
  errorMessage: string;
  docId: string;
}
/**
 * END
 * SignUp / Get Started Screens 
 */

/**
 * Home / Profile Screens
 */

export type HomeStackParamsList = {
  Home: undefined;
};

export type HomeProps = NativeStackScreenProps<HomeStackParamsList, "Home">


export type HomeNavigationProps = {
  screenHeight: number;
  screenWidth: number;
  navigationProp: NativeStackNavigationProp<HomeStackParamsList, "Home", undefined>
  auth: undefined | Auth;
}

/**
 * END
 * Home / Profile Screens
 */


export type ExpenseItemData = {
  item:string;
  costAndSign:string;
  cost:number | null;
}

/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { type ThemeType } from '../models/theme'

export type RootStackParamList =  {
  Main: undefined,
  Profile: undefined,
  Login: undefined,
  BottomNav: undefined,
  Register: undefined,
  GameDetail: undefined,
  RoomDetail: undefined,
  PaymentSuccess: undefined,
  Webview: undefined,
  Home: undefined,
  Discover: undefined,
  Play: undefined,
  Champion: undefined,
  Popular: undefined,
}

export interface WithCommonProps {
	theme: ThemeType,
	t: (str: string) => string
}

export type NavigationProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T> & WithCommonProps

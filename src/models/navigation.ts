/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { type ThemeType } from '../models/theme'
import { type Rooms } from './rooms'

export type RootStackParamList =  {
  main: {
    screen?: string
  },
  profile: undefined,
  login: undefined,
  forgotPassword: undefined,
  updatePassword: undefined,
  bottomNav: undefined,
  register: undefined,
  gameDetail: undefined,
  roomDetail: Partial<Rooms>,
  paymentSuccess: undefined,
  webview: {
    link: string
  },
  home: undefined,
  discover: undefined,
  play: undefined,
  champion: undefined,
  popular: undefined,
  tier: undefined,
  mvp: {
    unique?: boolean
  },
  unique: undefined,
  hallOfFame: undefined,
  gameBoardCollection: undefined,
  awards: undefined,
  accountInformation: undefined
  editPassword: undefined
  tnc: undefined
  privacyPolicy: undefined
}

export interface WithCommonProps {
	theme: ThemeType,
	t: (str: string, option?: any) => string
}

export type NavigationProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T> & WithCommonProps

/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { type ThemeType } from '../models/theme'
import { type Rooms } from './rooms'
import { type Games } from './games'

export type RootStackParamList =  {
  main: {
    screen?: string
  },
  profile: undefined,
  login: {
    email?: string,
    verify_token?:string,
    token?: string,
    type?: string
    usercode?: string
  },
  forgotPassword: undefined,
  updatePassword: {
    token?: string
  },
  bottomNav: undefined,
  register: {
    token?: string,
  },
  gameDetail: Partial<Games>,
  roomDetail: Partial<Rooms>,
  paymentSuccess: {
    game_code?: string
  },
  webview: {
    link: string,
    game_code?: string,
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
  privacyPolicy: undefined,
  notifications: undefined,
  transactions: undefined,
  editProfile: undefined
}

export interface WithCommonProps {
	theme: ThemeType,
	t: (str: string, option?: any) => string
}

export type NavigationProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T> & WithCommonProps

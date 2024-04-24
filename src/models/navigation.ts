/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { type ThemeType } from '../models/theme'
import { type Rooms } from './rooms'
import { type Games } from './games'

export type RootStackParamList =  {
  main: undefined,
  profile: undefined,
  login: undefined,
  forgotPassword: undefined,
  updatePassword: undefined,
  bottomNav: undefined,
  register: undefined,
  gameDetail: Partial<Games>,
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
  mvp: {
    unique?: boolean
  },
  unique: undefined,
  hallOfFame: undefined,
}

export interface WithCommonProps {
	theme: ThemeType,
	t: (str: string) => string
}

export type NavigationProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T> & WithCommonProps

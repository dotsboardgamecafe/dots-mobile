import { type ReactNode } from 'react'

export interface Games {
  game_code: string
  game_type: string
  cafe_id: number
  name: string
  image_url: string
  description: string
  collection_url: string
  status: string
  created_date: string
  is_popular: boolean
}

export interface GameType {
  id: number;
  name: string;
  selected?: boolean | undefined;
  icon?: ReactNode | undefined;
}

export interface GameMaster {
  id: number;
  name: string;
  photo?: string;
}
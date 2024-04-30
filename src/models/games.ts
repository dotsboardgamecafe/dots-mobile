import { type ReactNode } from 'react'
import { type Rooms } from './rooms'

export interface Games {
  cafe_code: string,
  cafe_name: string,
  game_code: string,
  game_type: string,
  name: string,
  image_url: string,
  collection_url: string,
  description: string,
  status: string,
  difficulty: number,
  duration: number,
  minimal_participant: number,
  maximum_participant: number,
  game_categories: GameCategory[],
  game_related?: Games[],
  game_rooms?: Rooms[],
  game_masters?: GameMasters[]
  
}

export interface GameCategory {
  category_name: string
}

export interface GameListParams {
  keyword?: string
  status: string
  sort: 'desc' | 'asc',
  order?: string,
  limit: number
}

export interface GameMasters {
  admin_code: string,
  email: string,
  name: string,
  status: string
  image_url?: string
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
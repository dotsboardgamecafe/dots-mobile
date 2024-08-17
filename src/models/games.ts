import { type ReactNode } from 'react'
import { type Rooms } from './rooms'

export interface Games {
	cafe_code: string,
	cafe_name: string,
	game_code: string,
	game_type: string,
	name: string,
	image_url: string,
	collection_url?: string[],
	description?: string,
	location?: string,
	status: string,
	difficulty: number,
	level?: number,
	duration: number,
	minimal_participant: number,
	maximum_participant: number,
	game_categories: GameCategory[],
	game_related?: Games[],
	game_rooms?: Rooms[],
	// game_masters?: GameMasters[],
	game_masters?: GameMasters,
	is_popular?: boolean
	total_player?: number
	user_have_played_game_history?: Array<{ user_image?: string }>
}

export interface GameRelated {
	game_id: number
	image_url?: string

}

export interface GameCategory {
	category_name: string
}

export interface GameListParams {
	keyword?: string
	status: string
	sort: 'desc' | 'asc',
	order?: string
	limit: number
	page?: number
	location?: string
	game_type?: string,
	game_category_name?: string,
	minimal_participant?: number,
	maximum_participant?: number
}

export interface GameMasters {
	admin_code: string,
	email: string,
	name: string,
	user_name: string,
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
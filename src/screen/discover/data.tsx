import React from 'react'
import GiDominoTiles from '../../assets/svg/GiDominoTiles.svg'
import { type GameType, type Games } from '../../models/games'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'

export const games: Games[] = Array.from({ length: 30 }, (_, i) => ({
	cafe_code: `CAFE-${i}`,
	cafe_name: 'Cafe Bandung',
	game_code: `GAME-${i}`,
	game_type: 'boardgame',
	name: 'Cafe Bandung Game A',
	image_url: '/path/images.png',
	collection_url: '/path/images.png',
	description: 'Bandung Paskal Hyper Square Game A.',
	status: 'active',
	difficulty: 4.4,
	duration: 11,
	minimal_participant: 2,
	maximum_participant: 6,
	game_categories: [
		{ category_name: 'Fun' },
		{ category_name: 'Excited' }
	]
}))

export const gameTypes: GameType[] = [
	{
		id: 0,
		name: 'Board Game',
		icon: <GiDominoTiles width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
	{
		id: 1,
		name: 'Cards',
		icon: <GiDominoTiles width={ scaleWidth(17) } height={ scaleHeight(17) }/>
	},
	{
		id: 2,
		name: 'Party',
		icon: <GiDominoTiles width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
	{
		id: 3,
		name: 'Party',
		icon: <GiDominoTiles width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
	{
		id: 4,
		name: 'Party',
		icon: <GiDominoTiles width={ scaleWidth(17) } height={ scaleHeight(17) }/>
	},
]
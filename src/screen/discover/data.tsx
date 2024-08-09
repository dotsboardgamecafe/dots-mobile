import React from 'react'
import GiDominoTiles from '../../assets/svg/GiDominoTiles.svg'
import GiCardRandom from '../../assets/svg/GiCardRandom.svg'
import GiPartyPopper from '../../assets/svg/GiPartyPopper.svg'
import GiShakingHands from '../../assets/svg/GiShakingHands.svg'
import GiDualityMask from '../../assets/svg/GiDualityMask.svg'
import GiEmptyChessboard from '../../assets/svg/GiEmptyChessboard.svg'
import GiGears from '../../assets/svg/GiGears.svg'
import GiRollingDices from '../../assets/svg/GiRollingDices.svg'
import GiTeamIdea from '../../assets/svg/GiTeamIdea.svg'
import GiSwordsPower from '../../assets/svg/GiSwordsPower.svg'
import { type GameType } from '../../models/games'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'

export const filterSections = ['type', 'mechanics', 'location']

export const gameTypes: GameType[] = [
	{
		id: 0,
		name: 'Board Game',
		icon: <GiDominoTiles width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
	{
		id: 1,
		name: 'Cards',
		icon: <GiCardRandom width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
	{
		id: 2,
		name: 'Party',
		icon: <GiPartyPopper width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
]

export const gameMechanics: GameType[] = [
	{
		id: 0,
		name: 'Negotiation',
		icon: <GiShakingHands width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
	{
		id: 1,
		name: 'Bluffing',
		icon: <GiDualityMask width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
	{
		id: 2,
		name: 'Tile Placement',
		icon: <GiEmptyChessboard width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
	{
		id: 3,
		name: 'Engine Building',
		icon: <GiGears width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
	{
		id: 4,
		name: 'Dice Rolling',
		icon: <GiRollingDices width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
	{
		id: 5,
		name: 'Worker Placement',
		icon: <GiTeamIdea width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
	{
		id: 6,
		name: 'Variable Player Powers',
		icon: <GiSwordsPower width={ scaleWidth(17) } height={ scaleHeight(17) } />
	},
]

export const locations: GameType[] = [
	{ id: 0, name: 'Bandung', },
	{ id: 1, name: 'Jakarta', },
]

export const rangeNumbers: GameType[] = [
	{ id: 0, name: '2 - 4', },
	{ id: 1, name: '4 - 6', },
	{ id: 2, name: '6 - 8', },
	{ id: 3, name: '8+', },
]
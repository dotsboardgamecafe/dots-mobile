import React from 'react'
import { type Settings } from '../../models/settings'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
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

const FilterIcon = (item: Settings): React.ReactNode => {
	if (item.set_group === 'game_mechanic') {
		const props = { width: scaleWidth(17), height: scaleHeight(17) }
		switch (item.set_key.toLowerCase()) {
			case 'negotiation':
				return (<GiShakingHands { ...props } />)
			case 'bluffing':
				return (<GiDualityMask { ...props } />)
			case 'tile_placement':
				return (<GiEmptyChessboard { ...props } />)
			case 'engine_building':
				return (<GiGears { ...props } />)
			case 'dice_rolling':
				return (<GiRollingDices { ...props } />)
			case 'worker_placement':
				return (<GiTeamIdea { ...props } />)
			case 'variable_player_powers':
				return (<GiSwordsPower { ...props } />)
		}
	}

	if (item.set_group === 'game_type') {
		const props = { width: scaleWidth(17), height: scaleHeight(17) }
		switch (item.set_key) {
			case 'board_game':
				return (<GiDominoTiles { ...props } />)
			case 'cards':
				return (<GiCardRandom { ...props } />)
			case 'party':
				return (<GiPartyPopper { ...props } />)
		}
	}

	return null
}

export default React.memo(FilterIcon)
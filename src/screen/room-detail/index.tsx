import React from 'react'

import { type NavigationProps } from '../../models/navigation'
import withCommon from '../../hoc/with-common'
import Container from '../../components/container'
import Text from '../../components/text'

type Props = NavigationProps<'roomDetail'>

const RoomDetail = ({ route }: Props): React.ReactNode => {
	const { type } = route.params
	return (
		<Container>
			<Text variant='bodyExtraLargeBold'>RoomDetail: { type }</Text>
		</Container>
	)
}

export default withCommon(React.memo(RoomDetail))
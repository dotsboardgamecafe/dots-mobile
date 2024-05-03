import { FlatList, View } from 'react-native'
import React from 'react'
import Header from '../../components/header'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'
import Container from '../../components/container'
import Text from '../../components/text'
import styles from './styles'

type Props = NavigationProps<'tnc'>

const message = {
	title: 'Lorem Ipsum',
	description: `
    Lorem ipsum dolor sit amet consectetur. Tellus diam a cursus interdum. Adipiscing facilisis senectus sem viverra neque. Et facilisi tellus rhoncus turpis morbi viverra dapibus arcu dui. Elementum nullam et odio nibh tincidunt turpis. Amet mi risus ut nisi cursus tellus. Cras nunc quam dictum suspendisse eget et faucibus enim. Odio odio lectus luctus ac. Dictumst tellus tristique volutpat risus mattis ut consequat tortor vel. \n\nEu velit a sed quis nunc varius potenti. Vel sed pharetra posuere risus amet ipsum nulla tortor. Lorem enim vitae at viverra nisl aliquam et etiam. Convallis lacus donec scelerisque tellus pulvinar arcu. Sit dictum luctus sit vitae. Blandit eu nisl et lobortis id et lacus. 
  `
}

const listMessage = Array(3).fill(message)

const TncPrivacyPolicy = ({ route }: Props): React.ReactNode => {

	return (
		<Container>
			<Header title={ route.name === 'tnc' ? 'Terms and Condition' : 'Privacy Policy' } />
			<FlatList
				style={ styles.contentStyle }
				data={ listMessage }
				renderItem={ ({ item }) => {
					return (
						<View>
							<Text variant='bodyLargeDemi'>{ item.title }</Text>
							<Text style={ styles.descriptionStyle } variant='bodyMiddleRegular'>{ item.description }</Text>
						</View>
					)
				} }
				keyExtractor={ (_, index) => index.toString() }
				bounces={ false }
				removeClippedSubviews
				showsVerticalScrollIndicator={ false }
			/>
		</Container>
	)
}

export default withCommon(React.memo(TncPrivacyPolicy))
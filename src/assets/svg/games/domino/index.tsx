import React from 'react'
import Svg, {
	Path,
	Defs,
	LinearGradient,
	Stop,
} from 'react-native-svg'
import { type IconType } from '../../type'
const Domino = ({ size }: IconType): React.ReactNode => (
	<Svg
		width={ size }
		height={ size }
		fill='none'
	>
		<Path
			fill='url(#a)'
			d='M10.3 2.682c-.206 0-.4.072-.51.182l-2.827 2.83c-.113.11-.185.306-.185.51-.003.2.069.393.169.49l7.087 7.087c.11.113.303.185.507.185.203 0 .396-.072.506-.185l.39-.39V7.5l-4.63-4.637c-.11-.11-.304-.182-.507-.182Zm-8.84.353c-.204 0-.399.073-.51.183l-.387.388v5.897l4.63 4.631c.11.113.304.185.507.185.206 0 .4-.072.51-.185l2.827-2.828c.113-.109.185-.303.185-.506 0-.206-.072-.4-.184-.51l-7.07-7.072c-.111-.11-.306-.183-.509-.183Zm8.843.544a.5.5 0 1 1-.013 1 .5.5 0 0 1 .013-1Zm-8.837.355a.5.5 0 1 1-.015 1 .5.5 0 0 1 .015-1ZM8.18 5.7h.003a.502.502 0 0 1 .344.853.502.502 0 0 1-.706 0 .502.502 0 0 1 .36-.853Zm4.244 0a.502.502 0 0 1 .347.853.502.502 0 0 1-.706 0 .502.502 0 0 1 .359-.853Zm-10.96.353a.5.5 0 1 1-.36.856.5.5 0 0 1 .36-.856Zm2.12 0h.002a.5.5 0 0 1 .347.856.5.5 0 0 1-.709 0 .5.5 0 0 1 .36-.856Zm10.05.656.4.4-2.829 2.829-.4-.4 2.828-2.829Zm-8.841.354.4.4-2.829 2.828-.398-.4 2.827-2.828Zm5.51.759a.502.502 0 0 1 .347.853.502.502 0 0 1-.707 0 .502.502 0 0 1 .36-.853Zm4.243 0a.502.502 0 0 1 .347.853.502.502 0 0 1-.707 0 .502.502 0 0 1 .36-.853Zm-13.081.353a.5.5 0 1 1-.015 1 .5.5 0 0 1 .015-1Zm4.24 0h.003a.502.502 0 0 1 .344.853.502.502 0 0 1-.706 0 .502.502 0 0 1 .36-.853Zm8.84 1.769a.502.502 0 0 1 .347.853.502.502 0 0 1-.706 0 .502.502 0 0 1 .36-.853Zm-10.962.353h.003a.502.502 0 0 1 .347.853.5.5 0 1 1-.35-.853Zm4.244 0a.502.502 0 0 1 .347.853.502.502 0 0 1-.706 0 .502.502 0 0 1 .36-.853Zm6.719 1.769a.502.502 0 0 1 .347.853.502.502 0 0 1-.707 0 .502.502 0 0 1 .36-.853Zm-8.84.353h.002a.502.502 0 0 1 .344.853.502.502 0 0 1-.706 0 .502.502 0 0 1 .36-.853Z'
		/>
		<Defs>
			<LinearGradient
				id='a'
				x1={ 0.563 }
				x2={ 15.438 }
				y1={ 8.5 }
				y2={ 8.5 }
				gradientUnits='userSpaceOnUse'
			>
				<Stop stopColor='#232526' />
				<Stop offset={ 1 } stopColor='#434343' />
			</LinearGradient>
		</Defs>
	</Svg>
)

export default React.memo(Domino)

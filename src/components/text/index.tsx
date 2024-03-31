import { customText } from 'react-native-paper'
import type defaultFontConfigs from '../../constants/fonts'

type CustomTextType = keyof typeof defaultFontConfigs

const Text = customText<CustomTextType>()

export default Text

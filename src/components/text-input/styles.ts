import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../utils/pixel.ratio";
import { ThemeType } from "../../models/theme";

const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(16),
    borderRadius: 12,
    borderColor: colors.background,
    borderWidth: 1,
    backgroundColor: colors.surface,
    height: scaleHeight(48),
  },

  input: {
    flex: 1,
    borderWidth: 0,
    color: colors.onBackground,
    fontFamily: 'FuturaPTBook'
  },

  isPrefix: { marginStart: scaleWidth(4) },
  isSuffix: { marginEnd: scaleWidth(4) },
})

export default createStyle
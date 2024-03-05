import { StyleSheet } from "react-native";
import { ThemeType } from "../../models/theme";
import { scaleHeight, scaleWidth } from "../../utils/pixel.ratio";

export const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scaleWidth(10),
    marginTop: scaleHeight(16),
    paddingHorizontal: scaleWidth(16),
    borderRadius: 12,
    borderColor: colors.background,
    borderWidth: 1,
    backgroundColor: colors.surface,
    height: scaleHeight(48),
  },

  search: {
    flex: 1,
    marginStart: scaleWidth(4),
    borderWidth: 0,
    color: colors.onBackground,
    fontFamily: 'FuturaPTBook'
  },

  filterContainer: {
    marginStart: scaleWidth(10),
    marginTop: scaleHeight(16),
    flexDirection: 'row'
  },

  list: {
    marginHorizontal: scaleWidth(10),
    marginTop: scaleHeight(10)
  },

  columnWrapper: {
    gap: scaleWidth(10)
  }
})
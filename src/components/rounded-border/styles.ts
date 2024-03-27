import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../utils/pixel.ratio";

const styles = StyleSheet.create({
  border: {
    flex: 1
  },

  container: {
    flex: 1, 
    paddingVertical: scaleHeight(8), 
    paddingHorizontal: scaleWidth(8),
    backgroundColor: 'white'
  },
})

export default styles
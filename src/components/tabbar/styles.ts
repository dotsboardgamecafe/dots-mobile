import { StyleSheet } from "react-native";
import { scaleHeight } from "../../utils/pixel.ratio";

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 0,
    zIndex: 2
  },

  whiteBg: {
    backgroundColor: 'white',
    height: scaleHeight(48),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  },

  items: { 
    zIndex: 1, 
    flexDirection: 'row' 
  }
})

export default styles
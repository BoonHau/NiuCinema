import {StyleProp, ViewStyle} from 'react-native';
import Colors from './Colors';

export default {
  button: {
    default: {
      backgroundColor: Colors.primaryColor,
      height: 55,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    } as StyleProp<ViewStyle>,
    small: {
      backgroundColor: Colors.primaryColor,
      height: 45,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    } as StyleProp<ViewStyle>,
  },
};

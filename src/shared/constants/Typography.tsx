import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
}

export default {
  title1: normalize(34),
  title2: normalize(28),
  title3: normalize(22),
  title4: normalize(20),
  headline: normalize(18),
  subhead1: normalize(17),
  subhead2: normalize(16),
  body: normalize(15),
  callout: normalize(14),
  footnote: normalize(13),
  caption1: normalize(12),
  caption2: normalize(11),
};

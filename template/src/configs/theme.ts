import { Dimensions } from 'react-native';

export const colors = {
  primary: '#0265FF',
  secondary: '#f1c40f',
  backdrop: 'green',
  outline: '#0265FF',
  tertiary: 'red',
  white: '#FEF8F4',
  grey: '#E0E0E0',
};
export enum FontWeight {
  black = 'Black',
  bold = 'Bold',
  extraBold = 'ExtraBold',
  extraLight = 'ExtraLight',
  light = 'Light',
  medium = 'Medium',
  regular = 'Regular',
  semiBiold = 'SemiBold',
  thin = 'Thin',
}
export enum Colors {
  primary = '#0265FF',
  secondary = '#f1c40f',
  backdrop = 'green',
  outline = '#0265FF',
  tertiary = 'red',
  white = '#FEF8F4',
  grey = '#EEEEEE',
  darkGrey = '#616161',
  light = '#9E9E9E',
  black = '#212121',
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');
export const sizing = {
  screen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  input: {
    height: 40,
    width: 300,
  },
  button: {
    height: 40,
    width: 300,
  },
  icon: {
    height: 40,
    width: 40,
  },
  text: {
    height: 40,
    width: 300,
  },
};

export const theme = {
  colors,
  spacing,
  sizing,
};

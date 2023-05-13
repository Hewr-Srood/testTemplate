import { colors } from './theme';

import { Platform, StatusBar, Dimensions } from 'react-native';

// guideline height for standard 5" device screen is 680

export function ResponsiveUnit(fontSize: number, standardScreenHeight = 680) {
  const { height, width } = Dimensions.get('window');
  const standardLength = width > height ? width : height;
  const offset = width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait

  const deviceHeight = Platform.OS === 'android' ? standardLength - offset! : standardLength;

  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}

// hof that provides navigation to getoptions

// ({ navigation }) => {
//   // hell no
//   return {
//     headerStyle: { backgroundColor: colors.white },
//     title: '',
//     // headerLeft: () => (
//     //   <IconButton
//     //     icon={'arrowleft'}
//     //     size={24}
//     //     onPress={() => {
//     //       navigation.goBack();
//     //     }}
//     //   />
//     // ),
//     headerShadowVisible: false,
//   };
// }

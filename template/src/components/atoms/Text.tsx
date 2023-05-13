import { FC } from 'react';
import { Text as RNText, View, TextProps as RNTextProps } from 'react-native';

import { Colors, FontWeight, ResponsiveUnit, colors } from '@configs';

enum Sizes {
  H1 = 32,
  H2 = 24,
  H3 = 18,
  H4 = 16,
  H5 = 14,
  H6 = 12,
  P = 16,
  P2 = 14,
  P3 = 12,
  P4 = 10,
  P5 = 8,
}

export interface TextProps extends RNTextProps {
  size?: keyof typeof Sizes;
  fontWeight?: FontWeight;
  color?: Colors;
  center?: boolean;
  italic?: boolean;
}

export const Text: FC<TextProps> = props => {
  const fontFamily = `Urbanist-${props.fontWeight || FontWeight.regular}${
    props.fontWeight !== FontWeight.regular && props.italic ? 'Italic' : ''
  }`;

  return (
    <View>
      <RNText
        {...props}
        style={[
          {
            fontFamily,
            fontSize: ResponsiveUnit(Sizes[props.size || 'P']),
            color: props.color || colors.primary,
            textAlign: props.center ? 'center' : 'left',
          },
          props.style,
        ]}
      />
    </View>
  );
};

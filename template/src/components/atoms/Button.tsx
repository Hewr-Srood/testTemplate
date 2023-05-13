import { TextProps, Text } from './Text';
import { withDebounce } from '@HOC';

import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';

import { Colors, colors, sizing } from '@configs';

interface Props extends TouchableOpacityProps {
  title?: string;
  outline?: boolean;
  color?: Colors;
  textColor?: Colors;
  textProps?: TextProps;
  LEFT_ICON?: ReactNode;
  iconSize?: number;
  bold?: boolean;
  containerStyle?: ViewStyle;
}
const CustomButton: React.FC<Props> = props => (
  <View style={[styles.buttonContainer, props.containerStyle]}>
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: props.color || colors.white,
        },
        props.style,
      ]}
      {...props}>
      {props.LEFT_ICON && (
        <View
          style={{
            width: props.iconSize || 24,
            height: props.iconSize || 24,
          }}>
          {props.LEFT_ICON}
        </View>
      )}
      {props.children}
      {props.title && (
        <Text size='P2' color={props.textColor} {...props.textProps}>
          {props.title}
        </Text>
      )}
    </TouchableOpacity>
  </View>
);

export const Button = withDebounce(CustomButton);

const styles = StyleSheet.create({
  buttonContainer: {
    width: sizing.screen.width * 0.9,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    width: '100%',
    gap: 10,
    flexDirection: 'row',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  //   text: { fontSize: 16, color: colors.primary },
});

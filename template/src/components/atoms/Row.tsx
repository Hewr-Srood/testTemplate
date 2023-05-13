import React, { FC, ReactNode } from 'react';
import { FlexStyle, View, ViewStyle } from 'react-native';

interface RowProps extends ViewStyle {
  gap?: FlexStyle['gap'];
  justifyContent?: FlexStyle['justifyContent'];
  alignItems?: FlexStyle['alignItems'];
  children: ReactNode;
}
export const Row: FC<RowProps> = props => {
  return (
    <View
      {...props}
      style={{
        flexDirection: 'row',
        justifyContent: props.justifyContent,
        alignItems: props.alignItems || 'center',
        gap: props.gap,
      }}>
      {props.children}
    </View>
  );
};

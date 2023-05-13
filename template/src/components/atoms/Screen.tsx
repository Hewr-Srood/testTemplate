import { FC, ReactNode } from 'react';
import { StatusBar, StyleSheet, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

interface SCREENProps {
  children: ReactNode;
  style?: ViewStyle;
  topEdge?: boolean;
}
export const SCREEN: FC<SCREENProps> = ({ children, style, topEdge }) => {
  const edges: Edge[] = ['right', 'bottom', 'left'];
  if (topEdge) {
    edges.push('top');
  }

  return (
    <SafeAreaView style={[styles.screen, style]} mode='padding' edges={edges}>
      <StatusBar translucent barStyle='dark-content' backgroundColor={'#F8F8F8'} />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

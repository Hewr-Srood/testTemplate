import { Text } from '@atoms';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { FontWeight, SCREEN_WIDTH, colors, spacing } from '@configs';

import { onboarding } from 'src/interfaces/onboarding';

export const BoardItem = ({
  item,
  index,
  x,
}: {
  item: onboarding;
  index: number;
  x: SharedValue<number>;
}) => {
  const animationStyle = useAnimatedStyle(() => {
    const translateX = withSpring(index * SCREEN_WIDTH - x.value);
    return {
      opacity: 1,
      transform: [{ translateX }],
    };
  });
  return (
    <Animated.View style={[styles.container, animationStyle]}>
      <View style={styles.image}>{item.image}</View>

      <View style={styles.textContainer}>
        <Text size='H1' fontWeight={FontWeight.bold} style={styles.text}>
          {item.text}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
  },
  image: {
    alignSelf: 'center',
    borderRadius: 10,
    width: SCREEN_WIDTH * 0.8,
    aspectRatio: 4 / 3,
  },
  textContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: colors.white,
    paddingHorizontal: spacing.md,
  },
});

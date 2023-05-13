import { Button, Pagination, Text } from '@atoms';
import { BoardItem } from '@molecules';
import { NavigationProps } from '@src/navigation/Application';
import { Board1, Board2, Board3 } from '@svg';

import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, View, ViewToken } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  FadeOut,
  FadeIn,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FontWeight, SCREENS, SCREEN_HEIGHT, colors, sizing, spacing } from '@configs';

import { onboarding } from '@src/interfaces/onboarding';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedView = Animated.createAnimatedComponent(View);
const data: onboarding[] = [
  {
    id: 1,
    image: <Board1 />,

    text: 'We provide the best learning courses & great mentors!',
  },
  {
    id: 2,
    image: <Board2 />,

    text: 'Learn anytime and anywhere easily and conveniently',
  },
  {
    id: 3,
    image: <Board3 />,
    text: "Let's improve your skills together with Ferline right now!",
  },
];
const keyExtractor = (item: onboarding) => item.id.toString();
interface OnboardingProps {
  navigation: NavigationProps;
}
export const OnboardingScreen: FC<OnboardingProps> = ({ navigation }) => {
  const x = useSharedValue(0);
  const flatListRef = useAnimatedRef<FlatList>();
  const [text, setText] = useState('Next');
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index === data?.length - 1) {
        setText('Get Started');
      } else {
        setText('Next');
      }
      flatListIndex.value = viewableItems[0]?.index || 0;
    },
    [],
  );

  const handlePress = () => {
    if (flatListIndex.value < data?.length - 1) {
      flatListRef?.current?.scrollToIndex({ index: flatListIndex.value + 1 });
    } else {
      navigation.navigate(SCREENS.LETSIN);
    }
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.overlay} />
      <View style={styles.listContainer}>
        <AnimatedFlatList
          ref={flatListRef}
          onScroll={scrollHandler}
          data={data}
          // @ts-ignore
          renderItem={({ item, index }: { item: onboarding; index: number }) => {
            return <BoardItem item={item} index={index} x={x} />;
          }}
          // @ts-ignore
          keyExtractor={keyExtractor}
          scrollEventThrottle={16}
          horizontal={true}
          bounces={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            minimumViewTime: 300,
            viewAreaCoveragePercentThreshold: 10,
          }}
        />
      </View>
      <View style={styles.paginationContainer}>
        <Pagination data={data} x={x} />
      </View>

      <Button onPress={handlePress}>
        {text === 'Get Started' ? (
          <AnimatedView key={1} entering={FadeIn.duration(500)}>
            <Text size='H6' fontWeight={FontWeight.bold}>
              Get Started
            </Text>
          </AnimatedView>
        ) : (
          <AnimatedView key={2} entering={FadeIn.duration(500)}>
            <Text size='H6' fontWeight={FontWeight.bold}>
              Next
            </Text>
          </AnimatedView>
        )}
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    width: sizing.screen.width,
    height: sizing.screen.height * 0.5,
    backgroundColor: colors.primary,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  listContainer: {
    height: SCREEN_HEIGHT * 0.7,
    paddingTop: spacing.md,
  },
  paginationContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

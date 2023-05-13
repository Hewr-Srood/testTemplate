import { Pagination } from '@atoms';

import React, { FC, useCallback, useEffect, useRef } from 'react';
import { Image, StyleSheet, View, ViewToken } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  SharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  interpolate,
} from 'react-native-reanimated';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@configs';

// import { onboarding } from '@src/interfaces/onboarding';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const data = [
  {
    id: 1,

    text: 'We provide the best learning courses & great mentors!',
  },
  {
    id: 2,

    text: 'Learn anytime and anywhere easily and conveniently',
  },
  {
    id: 3,

    text: "Let's improve your skills together with Ferline right now!",
  },
];
const keyExtractor = (_item: any, index: number) => index;

let isIncreasing = false;
const RenderItem = ({ item, index, x }: { item: any; index: number; x: SharedValue<number> }) => {
  const animationStyle = useAnimatedStyle(() => {
    const translateX = withSpring(index * SCREEN_WIDTH - x.value, {
      velocity: 100,
    });
    const opacity = interpolate(index * SCREEN_WIDTH - x.value, [0, index * SCREEN_WIDTH], [1, 0]);

    return {
      opacity,
      transform: [{ translateX }],
    };
  });
  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={[{ width: SCREEN_WIDTH, alignItems: 'center' }, animationStyle]}>
      <View
        style={{
          aspectRatio: 21 / 9,
          width: SCREEN_WIDTH * 0.9,
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <Image
          style={{ width: '100%', height: '100%' }}
          source={{
            uri: 'https://picsum.photos/1600/900',
          }}
        />
      </View>
    </Animated.View>
  );
};

export const Signup: FC = () => {
  const x = useSharedValue(0);
  const flatListRef = useAnimatedRef<FlatList>();
  const timer = useRef<ReturnType<typeof setInterval>>();
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      flatListIndex.value = viewableItems[0]?.index || 0;
    },
    [],
  );

  const handlePress = () => {
    if (flatListIndex.value === data?.length - 1 || flatListIndex.value === 0) {
      isIncreasing = !isIncreasing;
    }
    flatListRef?.current?.scrollToIndex({
      index: (isIncreasing ? flatListIndex.value + 1 : flatListIndex.value - 1) % data?.length,
    });
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });
  useEffect(() => {
    timer.current = setInterval(() => {
      handlePress();
    }, 8000);
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  return (
    <View style={{ position: 'relative' }}>
      <AnimatedFlatList
        ref={flatListRef}
        contentContainerStyle={{ alignItems: 'center' }}
        onScroll={scrollHandler}
        onScrollBeginDrag={() => {
          if (timer.current) {
            clearInterval(timer.current);
          }
        }}
        onScrollEndDrag={() => {
          console.log('onScrollEndDrag');
          timer.current = setInterval(() => {
            handlePress();
          }, 8000);
        }}
        data={data}
        // @ts-ignore
        renderItem={({ item, index }) => <RenderItem item={item} index={index} x={x} />}
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
      <View style={{ position: 'absolute', bottom: 10, alignSelf: 'center' }}>
        <Pagination data={data} x={x} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: SCREEN_HEIGHT * 0.25,
  },
  paginationContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

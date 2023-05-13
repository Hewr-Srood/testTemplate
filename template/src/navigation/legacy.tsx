import { Button, Pagination, Text } from '@atoms';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

import React from 'react';
import { StyleSheet, View, SafeAreaView, useWindowDimensions, FlatList } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedStyle,
  withSpring,
  useScrollViewOffset,
  scrollTo,
} from 'react-native-reanimated';

import Board1 from '../components/svg/Board1';
import Board2 from '../components/svg/Board2';
import Board3 from '../components/svg/Board3';

import { colors, sizing, spacing } from '../configs/theme';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedFlatList2 = Animated.createAnimatedComponent(BottomSheetFlatList);
const data = [
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
const OnboardingScreen = () => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const x = useSharedValue(0);
  const flatList1Ref = useAnimatedRef<FlatList>();
  const flatList2Ref = useAnimatedRef();
  const flatListIndex = useSharedValue(0);
  const isTop = useSharedValue(false);
  const onViewableItemsChanged = ({ viewableItems }) => {
    flatListIndex.value = viewableItems[0]?.index || 0;
  };

  const scrollOffset1 = useScrollViewOffset(flatList1Ref);
  const scrollOffset2 = useScrollViewOffset(flatList2Ref);
  const handlePress = () => {
    if (flatListIndex.value < data?.length - 1) {
      flatList1Ref?.current.scrollToIndex({ index: flatListIndex.value + 1 });
    } else {
      flatList1Ref?.current.scrollToIndex({ index: 0 });
    }
  };

  useAnimatedStyle(() => {
    'worklet';
    scrollTo(
      isTop.value ? flatList2Ref : flatList1Ref,
      (isTop.value ? scrollOffset1 : scrollOffset2).value,
      0,
      false,
    );

    return {};
  }, []);
  const scrollHandler1 = useAnimatedScrollHandler({
    onScroll: event => {
      isTop.value = true;
      x.value = event.contentOffset.x;
    },
  });
  const scrollHandler2 = useAnimatedScrollHandler({
    onScroll: event => {
      isTop.value = false;
      x.value = event.contentOffset.x;
    },
  });

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderItem = ({
    item,
    index,
    onlyImage,
  }: {
    item: { image: JSX.Element; text: string; id: number };
    index: number;
    onlyImage?: boolean;
  }) => {
    const animationStyle = useAnimatedStyle(() => {
      const translateX = withSpring(index * SCREEN_WIDTH - x.value);
      return {
        opacity: 1,
        transform: [{ translateX }],
      };
    });
    return (
      <View
        style={[{ width: SCREEN_WIDTH, justifyContent: onlyImage ? 'flex-start' : 'flex-end' }]}>
        {onlyImage ? (
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              height: sizing.screen.height * 0.5,
            }}>
            <Animated.View
              style={[
                animationStyle,
                { borderRadius: 10, width: SCREEN_WIDTH * 0.8, height: SCREEN_WIDTH * 0.8 },
              ]}>
              {item.image}
            </Animated.View>
          </View>
        ) : (
          <Animated.View style={animationStyle}>
            <Text bold size='H1' style={styles.text}>
              {item.text}
            </Text>
          </Animated.View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFlatList
        ref={flatList1Ref}
        onScroll={scrollHandler1}
        data={data}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} onlyImage />;
        }}
        keyExtractor={item => item.id}
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
      <BottomSheet
        handleComponent={() => null}
        enableContentPanningGesture={false}
        animateOnMount={false}
        handleStyle={[{ padding: 0 }]}
        snapPoints={['45%']}
        handleIndicatorStyle={styles.indicator}
        backgroundStyle={{ backgroundColor: colors.primary }}>
        <View style={styles.contentContainer}>
          <View style={{ height: sizing.screen.height * 0.22 }}>
            <AnimatedFlatList2
              key={'123'}
              ref={flatList2Ref}
              data={data}
              renderItem={({ item, index }) => {
                return <RenderItem item={item} index={index} />;
              }}
              keyExtractor={item => item.id}
              onScroll={scrollHandler2}
              scrollEventThrottle={16}
              horizontal={true}
              bounces={false}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              viewabilityConfig={{
                minimumViewTime: 300,
                viewAreaCoveragePercentThreshold: 10,
              }}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Pagination data={data} x={x} />
          </View>

          <Button onPress={handlePress} title='Next' />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: '#F8E9B0',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F8E9B0',
  },
  itemTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  itemText: {
    textAlign: 'center',
    marginHorizontal: 35,
    color: 'black',
    lineHeight: 20,
  },
  bottomContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
  },

  indicator: {
    display: 'none',
    padding: 0,
    height: 0,
    width: 0,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: spacing.md,
  },
  text: {
    textAlign: 'center',
    color: colors.white,

    paddingHorizontal: spacing.md,
  },

  pagerStyle: {
    width: '100%',
    height: '50%',
  },
  pageContainer: {
    width: sizing.screen.width,
    height: sizing.screen.width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    width: sizing.screen.width * 0.7,
    height: sizing.screen.width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',

    alignSelf: 'center',
  },
});

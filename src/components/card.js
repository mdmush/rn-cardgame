import React, {useRef, useEffect} from 'react';
import {StyleSheet, Text, Pressable, Animated} from 'react-native';

const Card = ({testID, value, isFlipped, onClick, isDisabled, isInactive}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const progressValue = useRef(0);

  useEffect(() => {
    const handler = ({value}) => {
      progressValue.current = Math.round(value);
    };
    progress.addListener(handler);
    return () => {
      progress.removeListener(handler);
    };
  }, []);

  useEffect(() => {
    if (!(isFlipped || isInactive) && progressValue.current == 180) {
      Animated.spring(progress, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: false,
      }).start();
    }
  }, [isFlipped, isInactive]);

  const onClickHandler = () => {
    if (!isFlipped && !isDisabled) {
      onClick();
      Animated.spring(progress, {
        toValue: !isFlipped ? 180 : 0,
        friction: 8,
        tension: 10,
        useNativeDriver: false,
      }).start();
    }
  };

  const frontInterpolate = progress.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const backInterpolate = progress.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };

  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };
  return (
    <Pressable
      className="w-[120px] h-[140px] mt-[8px] rounded-[8px]"
      onPress={onClickHandler}
      testID={testID}>
      <Animated.View
        className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center rounded-[8px] bg-[#f97316] border-r-2 border-b-2 border-[#9c460b]"
        style={[styles.cardContainer, frontAnimatedStyle]}>
        <Text className="text-[20px] font-bold text-white">{value}</Text>
      </Animated.View>

      <Animated.View
        className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center rounded-[8px] bg-[#fcba03] border-r-2 border-b-2 border-[#a17400]"
        style={[styles.cardContainer, backAnimatedStyle]}>
        <Text className="text-[20px] font-bold text-white">?</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backfaceVisibility: 'hidden',
  },
  flipCard: {
    transform: [{rotateY: '180deg'}],
  },
});

export default Card;

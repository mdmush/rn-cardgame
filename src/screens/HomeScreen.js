import React from 'react';
import {SafeAreaView, Text, Pressable} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-[28px] font-bold text-black">Welcome to Card Game</Text>
      <Pressable
        className="rounded-full bg-[#1890ff] items-center justify-center px-[16px] py-[8px] mt-[12px]"
        onPress={() => navigation.navigate('GameScreen')}>
        <Text className="text-[16px] text-white">Start Game</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default HomeScreen;

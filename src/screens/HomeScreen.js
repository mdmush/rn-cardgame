import React from 'react';
import {SafeAreaView, Text, Pressable} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#fcba03]">
      <Text className="text-[40px] text-center font-bold text-black">Welcome to Card Game</Text>
      <Pressable
        className="rounded-full bg-[#fff] items-center justify-center px-[24px] py-[14px] mt-[30px] border-b-[8px] border-r-[6px] border-[#a17400]"
        onPress={() => navigation.navigate('GameScreen')}>
        <Text className="text-[18px] text-black">Start Game</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default HomeScreen;

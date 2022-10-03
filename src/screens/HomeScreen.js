import React from 'react';
import {SafeAreaView, Text, Pressable, StyleSheet} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Welcome to Card Game</Text>
      <Pressable
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('GameScreen')}>
        <Text style={styles.buttonText}>Start Game</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcba03',
  },
  heading: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginTop: 30,
    borderColor: '#a17400',
    borderRightWidth: 6,
    borderBottomWidth: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default HomeScreen;

import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from '../src/Navigator';
import GameScreen from '../src/screens/GameScreen';

describe('React Native Card Game', () => {
  const component = (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );

  it('Renders the correct message', () => {
    render(component);
    expect(screen.queryByText('Welcome to Card Game')).toBeTruthy();
  });

  test('Start game', async () => {
    render(component);
    const toClick = await screen.findByText('Start Game');
    fireEvent(toClick, 'press');

    const items = await screen.findAllByText('?');
    expect(items.length).toBe(12);
  });

  test('Check all cards', async () => {
    render(<GameScreen />);

    const items = await screen.findAllByText('?');
    expect(items.length).toBe(12);
  });

  test('Click 2 cards and score update', async () => {
    render(<GameScreen />);

    const score = await screen.getByText('STEP : 0');
    expect(score).toBeTruthy();

    const toClickCard = await screen.getByTestId('test-0');
    fireEvent(toClickCard, 'press');

    const toClickCard2 = await screen.getByTestId('test-1');
    fireEvent(toClickCard2, 'press');

    const updatedScore = await screen.getByText('STEP : 2');

    expect(updatedScore).toBeTruthy();
  });

  test('Restart game', async () => {
    render(<GameScreen />);

    const toClickCard = await screen.getByTestId('test-0');
    fireEvent(toClickCard, 'press');

    const toClickCard2 = await screen.getByTestId('test-1');
    fireEvent(toClickCard2, 'press');

    const restartButton = await screen.getByText('Restart');
    fireEvent(restartButton, 'press');

    const score = await screen.getByText('STEP : 0');
    expect(score).toBeTruthy();
  });
});

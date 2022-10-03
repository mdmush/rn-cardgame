import React, {useState, useEffect, useRef, useReducer} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import Card from '../components/card';
import reducer from '../reducer.js';

function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currIndex = i - 1;
    swap(array, currIndex, randomIndex);
  }
  return array;
}

function init(initialCount) {
  return {count: initialCount};
}

const GameScreen = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, 0, init);
  const CARD_PAIRS_VALUE = 6;
  const [uniqueCardsArray, setUniqueCardsArray] = useState([]);
  const [cards, setCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const timeout = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);

  useEffect(() => {
    let list = [];
    while (list.length < CARD_PAIRS_VALUE) {
      let value = Math.floor(Math.random() * 100 + 1);
      if (list.indexOf(value) == -1) {
        list.push(value);
      }
    }

    setUniqueCardsArray(list);
    setCards(() => shuffleCards(list.concat(list)));
  }, []);

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first] === cards[second]) {
      setClearedCards(prev => ({...prev, [cards[first]]: true}));
      setOpenCards([]);
      return;
    }
    // Flip cards after a 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  useEffect(() => {
    if (openCards.length === 2) {
      setTimeout(evaluate, 1000);
    }
  }, [openCards]);
  useEffect(() => {
    if (uniqueCardsArray.length > 0) {
      checkCompletion();
    }
  }, [clearedCards]);

  const checkIsFlipped = index => {
    return openCards.includes(index);
  };

  const checkIsInactive = card => {
    return Boolean(clearedCards[card]);
  };

  const handleCardClick = index => {
    // Have a maximum of 2 items in array at once.
    dispatch({type: 'increment'});
    if (openCards.length === 1) {
      setOpenCards(prev => [...prev, index]);
      disable();
    } else {
      // If two cards are already open, we cancel timeout set for flipping cards back
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  const checkCompletion = () => {
    // We are storing clearedCards as an object since its more efficient
    //to search in an object instead of an array
    if (Object.keys(clearedCards).length === uniqueCardsArray.length) {
      setShowModal(true);
    }
  };

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    dispatch({type: 'reset'});

    // set a shuffled deck of cards
    setCards(() => shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const onBackPress = () => {
    handleClose();
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>STEP : {state.count}</Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: 'space-around',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {cards.map((value, index) => {
          return (
            <Card
              testID={`test-${index}`}
              key={index}
              index={index}
              value={value}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(value)}
              isFlipped={checkIsFlipped(index)}
              onClick={() => handleCardClick(index)}
            />
          );
        })}
      </ScrollView>
      <Modal
        visible={showModal}
        transparent={true}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Hurray 🎊 You completed the challenge
            </Text>
            <Text style={styles.modalText}>
              You completed the Game in {state.count} moves
            </Text>
            <View style={styles.modalButtonContainer}>
              <Pressable
                onPress={onBackPress}
                style={[
                  styles.backButton,
                  {
                    backgroundColor: '#fff',
                    paddingHorizontal: 18,
                    paddingVertical: 10,
                  },
                ]}>
                <Text
                  style={[styles.buttonText, {fontSize: 12, color: '#fcba03'}]}>
                  Go Back
                </Text>
              </Pressable>
              <Pressable
                onPress={handleRestart}
                style={[
                  styles.restartButton,
                  {
                    backgroundColor: '#fff',
                    paddingHorizontal: 40,
                    paddingVertical: 10,
                  },
                ]}>
                <Text
                  style={[styles.buttonText, {fontSize: 12, color: '#fcba03'}]}>
                  Restart
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.bottomContainer}>
        <Pressable onPress={onBackPress} style={styles.backButton}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
        <Pressable onPress={handleRestart} style={styles.restartButton}>
          <Text style={styles.buttonText}>Restart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(212,212,212,0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fcba03',
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: '#a17400',
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  modalText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    borderRadius: 30,
    backgroundColor: '#fcba03',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginTop: 30,
    marginLeft: 8,
    borderColor: '#a17400',
    borderRightWidth: 6,
    borderBottomWidth: 8,
  },
  restartButton: {
    borderRadius: 30,
    backgroundColor: '#fcba03',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    paddingVertical: 14,
    marginTop: 30,
    marginLeft: 8,
    borderColor: '#a17400',
    borderRightWidth: 6,
    borderBottomWidth: 8,
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GameScreen;

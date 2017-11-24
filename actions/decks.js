import { getDecks, getDeck, saveDeckTitle, addCardToDeck } from '../utils/storage';
import { FETCH_DECKS, FETCH_DECK, ADD_DECK, ADD_CARD, ERROR } from '../actions';

export function fetchDecks() {
  return async (dispatch) => {
    try{
      const decks = await getDecks();
      dispatch ({ type: FETCH_DECKS, payload: decks });
    }
    catch(error) {
      dispatch({ type: ERROR, payload: error });
    }
  };
}

export function fetchDeck(title) {
  return async (dispatch) => {
    try{
      const deck = await getDeck(title);
      dispatch ({ type: FETCH_DECK, payload: deck });
    }
    catch(error) {
      dispatch({ type: ERROR, payload: error });
    }
  };
}

export function addDeck(title) {
  return async (dispatch) => {
    try{
      await saveDeckTitle(title);
      dispatch ({ type: ADD_DECK, payload: title });
    }
    catch(error) {
      dispatch({ type: ERROR, payload: error });
    }
  };
}

export function addCard(title, card) {
  return async (dispatch) => {
    try {
      await addCardToDeck(title, card);
      dispatch({
        type: ADD_CARD, payload: {
          title,
          card
        }
      });
    }
    catch (error) {
      dispatch({type: ERROR, payload: error});
    }
  };
}

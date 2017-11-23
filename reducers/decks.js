import { FETCH_DECKS, FETCH_DECK, ADD_DECK, ADD_CARD, ERROR } from '../actions';

export default function decks(state = {}, action) {
  switch(action.type) {
    case FETCH_DECKS:
      return {
        ...action.payload
      };
    case FETCH_DECK:
      return {
        ...state,
        ...action.payload
      };
    case ADD_DECK:
      return {
        ...state,
        [action.payload.title]: {
          title: action.payload.title,
          questions: []
        }
      };
    case ADD_CARD:
      const deck = state[action.payload.title];
      return {
        ...state,
        [action.payload.title]: {
          ...deck,
          questions: deck && deck.questions ? deck.questions.concat(action.payload.card) : [action.payload.card]
        }
      };
    case ERROR:
      console.warn(action.payload);
      return state;
    default:
      return state;
  }
}
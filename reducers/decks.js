import { FETCH_DECKS, FETCH_DECK, ADD_DECK, ADD_CARD, ERROR } from '../actions';

export const DECKS_INITIAL_STATE = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

export const decks = (state = DECKS_INITIAL_STATE, action) => {
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
};

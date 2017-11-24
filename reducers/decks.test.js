import { decks, DECKS_INITIAL_STATE}  from './decks';
import { FETCH_DECKS, FETCH_DECK, ADD_DECK, ADD_CARD, ERROR } from '../actions';

describe('decks reducer', () => {
  it('should return the initial state', () => {
    expect(decks(undefined, {})).toEqual(DECKS_INITIAL_STATE);
  });

  it('should return the existing state if action type doesn\'t exist', () => {
    expect(decks(undefined, { type: 'gibberish'})).toEqual(DECKS_INITIAL_STATE);
  });

  it('should fetch the decks from payload and store in redux store', () => {
    const newDecks = {
      Test: { title: 'Test', questions: [] },
      Test2: { title: 'Test2', questions: [] },
    };
    expect(decks(undefined, { type: FETCH_DECKS, payload: newDecks })).toEqual(newDecks);
  });

  it('should fetch the deck from payload and add it to redux store', () => {
    const newDeck = { Test: { title: 'Test', questions: [] } };
    const newDeckStore = {
      ...DECKS_INITIAL_STATE,
      ...newDeck
    };
    expect(decks(undefined, { type: FETCH_DECK, payload: newDeck })).toEqual(newDeckStore);
  });

  it('should create a new deck with the given title and add it to redux store', () => {
    const title = { title: 'Test' };
    const newDeck = { Test: { title: 'Test', questions: [] } };
    const newDeckStore = {
      ...DECKS_INITIAL_STATE,
      ...newDeck
    };
    expect(decks(undefined, { type: ADD_DECK, payload: title })).toEqual(newDeckStore);
  });

  it('should create a new question in the deck and add it to redux store', () => {
    const payload = { title: 'Test', card: { question: 'Is this a good question?', answer: 'yes'} };
    const deck = DECKS_INITIAL_STATE[payload.title];
    const newDeckStore = {
      ...DECKS_INITIAL_STATE,
      [payload.title]: {
        ...deck,
        questions: deck && deck.questions ? deck.questions.concat(payload.card) : [payload.card]
      }
    };
    expect(decks(undefined, { type: ADD_CARD, payload: payload })).toEqual(newDeckStore);
  });
});

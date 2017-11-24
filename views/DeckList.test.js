import React from 'react';
import { DeckList } from './DeckList';
import renderer from 'react-test-renderer';

const decks = {
  React: { title: 'React', questions: [] },
  JavaScript: { title: 'JavaScript', questions: [] },
};

describe('DeckList', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<DeckList
      decks={Object.keys(decks).map(key => decks[key])}
      fetchDecks={() => decks}
    />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});

import React from 'react';
import { Deck } from './Deck';
import renderer from 'react-test-renderer';

const deck = { title: 'React', questions: [] };

describe('Deck', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Deck
      deck={deck}
      fetchDeck={() => deck}
    />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});

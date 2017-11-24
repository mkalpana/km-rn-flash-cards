import React from 'react';
import { AddDeck } from './AddDeck';
import renderer from 'react-test-renderer';

describe('AddDeck', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<AddDeck
      fetchDecks={() => ([])}
    />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});

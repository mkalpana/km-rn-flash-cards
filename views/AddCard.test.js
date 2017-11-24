import React from 'react';
import { AddCard } from './AddCard';
import renderer from 'react-test-renderer';

describe('AddCard', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<AddCard
      title="React"
      addCard={() => ({})}
      fetchDecks={() => ([])}
    />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});

import React from 'react';
import { Quiz } from './Quiz';
import renderer from 'react-test-renderer';

const deck = { title: 'React', questions: [] };

describe('Quiz', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Quiz
      deck={deck}
      fetchDeck={() => deck}
      navigation={{
        goBack: null,
        state: { params: { title: 'React' } }
      }}

    />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});

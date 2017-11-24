import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

jest.mock('ScrollView', () => jest.genMockFromModule('ScrollView'));

describe('App', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<App/>).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});

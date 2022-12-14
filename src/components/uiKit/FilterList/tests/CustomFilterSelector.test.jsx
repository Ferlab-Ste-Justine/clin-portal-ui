import React from 'react';
import renderer from 'react-test-renderer';

import CustomFilterSelector from '../index';

describe('CustomFilterSelector', () => {
  test('should be as the snapshot', () => {
    const component = renderer.create(<CustomFilterSelector filterInfo={{ groups: [] }} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

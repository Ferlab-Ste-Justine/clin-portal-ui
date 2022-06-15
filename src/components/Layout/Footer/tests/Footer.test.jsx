import React from 'react';
import renderer from 'react-test-renderer';

import Footer from '../index';

describe('Footer', () => {
  test('should be as the snapshot', () => {
    const component = renderer.create(<Footer />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

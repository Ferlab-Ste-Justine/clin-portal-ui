import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { LANG } from 'utils/constants';

import Landing from '../index';

// stub to fix ANTD error
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe('Landing', () => {
  test('should be as the snapshot', () => {
    const initialState = {
      global: {
        lang: LANG.FR,
      },
    };
    const store = configureStore()(initialState);
    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <Landing />
        </Router>
      </Provider>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

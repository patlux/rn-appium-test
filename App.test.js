import * as React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

test('Should render', () => {
  const result = renderer.create(<App />).toJSON();
  expect(result).toBeDefined();
  expect(result).not.toBeNull();
});

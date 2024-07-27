import React from 'react';
import {render} from '@testing-library/react-native';
import Button from './Button';
test('should match with snapshot', () => {
  const comp = render(<Button text={''} onPress={undefined} />);
  expect(comp).toMatchSnapshot();
});

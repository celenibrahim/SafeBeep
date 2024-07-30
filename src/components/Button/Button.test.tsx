import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Button from './Button';
test('should match with snapshot', () => {
  const comp = render(<Button text={''} onPress={undefined} />);
  expect(comp).toMatchSnapshot();
});
test('should render title correctly', () => {
  const testTitle = 'test';
  const comp = render(<Button text={testTitle} onPress={undefined} />);

  const buttonText = comp.getByTestId('button-title').children[0];
  expect(buttonText).toBe(testTitle);
  console.log(buttonText);
});
test('should trigger onPress', () => {
  const mockFunction = jest.fn();
  const comp = render(<Button text={''} onPress={mockFunction} />);

  const buttonTouchable = comp.getByTestId('button-touchable');
  fireEvent(buttonTouchable, 'press');
  expect(mockFunction).toHaveBeenCalled();
});

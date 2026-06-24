import React from 'react';
import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from '../App';
import { colors } from '../src/theme';

const initialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

describe('app foundation', () => {
  it('renders the home screen from the app root', () => {
    const { getByText } = render(
      <SafeAreaProvider initialMetrics={initialMetrics}>
        <App />
      </SafeAreaProvider>,
    );
    expect(getByText(/Good (morning|afternoon|evening)/)).toBeTruthy();
    expect(getByText('Your spending overview')).toBeTruthy();
  });

  it('imports theme tokens without circular dependency issues', () => {
    expect(colors.background).toBe('#FFFFFF');
    expect(colors.text).toBe('#111111');
  });
});

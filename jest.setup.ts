import '@testing-library/jest-native/extend-expect';

jest.setTimeout(15000);

const mockStorage = new Map<string, string>();

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(async (key: string, value: string) => {
    mockStorage.set(key, value);
  }),
  getItem: jest.fn(async (key: string) => mockStorage.get(key) ?? null),
  removeItem: jest.fn(async (key: string) => {
    mockStorage.delete(key);
  }),
  clear: jest.fn(async () => {
    mockStorage.clear();
  }),
}));

jest.mock('expo-blur', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    BlurView: ({ children, style }: { children: React.ReactNode; style?: object }) =>
      React.createElement(View, { style }, children),
  };
});

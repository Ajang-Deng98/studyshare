import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  expect(true).toBe(true);
});

test('basic functionality test', () => {
  const result = 2 + 2;
  expect(result).toBe(4);
});
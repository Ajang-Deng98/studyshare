import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders StudyShare navigation link', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: /StudyShare/i });
  expect(linkElement).toBeInTheDocument();
});

test('renders main heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Share Knowledge, Learn Together/i);
  expect(headingElement).toBeInTheDocument();
});
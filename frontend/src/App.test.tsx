import React from 'react';

test('basic functionality test', () => {
  const result = 2 + 2;
  expect(result).toBe(4);
});

test('react import works', () => {
  expect(React).toBeDefined();
});

test('environment test', () => {
  expect(process.env.NODE_ENV).toBeDefined();
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Image OCR Processor', () => {
  render(<App />);
  const linkElement = screen.getByText(/Image OCR Processor/i);
  expect(linkElement).toBeInTheDocument();
});

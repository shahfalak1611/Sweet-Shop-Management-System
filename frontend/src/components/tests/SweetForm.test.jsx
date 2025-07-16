import React from 'react';
import { render, screen } from '@testing-library/react';
import SweetForm from '../SweetForm';

test('renders input fields', () => {
  render(<SweetForm />);
  expect(screen.getByPlaceholderText(/id/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
});
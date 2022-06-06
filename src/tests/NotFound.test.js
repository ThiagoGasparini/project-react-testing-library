import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

beforeEach(() => render(<NotFound />));

test('página contém um heading h2 com o texto Page requested not found', () => {
  const notFound = screen.getByRole('heading', {
    name: /Page requested not found/i,
  });
  expect(notFound).toBeInTheDocument();
});

test(
  'página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  () => {
    const notFoundImage = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  },
);

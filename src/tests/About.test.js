import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../pages';

beforeEach(() => render(<About />));

test('A página contém um h2 com o texto "About Pokédex"', () => {
  const textAbout = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
  expect(textAbout).toBeInTheDocument();
});

test('página contém dois parágrafos com texto sobre a Pokédex', () => {
  const p = screen.getAllByText(/Pokémons/);
  expect(p).toHaveLength(2);
  p.forEach((paragraph) => expect(paragraph).toBeInTheDocument());
});

test('página contém a seguinte imagem de uma Pokédex', () => {
  const img = screen.getByRole('img');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  expect(img).toHaveAttribute('alt', 'Pokédex');
});

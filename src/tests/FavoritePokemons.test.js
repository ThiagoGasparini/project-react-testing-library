import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('exibição do texto "No favorite pokemon found"', () => {
  renderWithRouter(<App />);

  const favoritesLink = screen.getByRole('link', { name: /Favorite pokémons/i });
  userEvent.click(favoritesLink);

  const textFavorites = screen.getByText('No favorite pokemon found');
  expect(textFavorites).toBeInTheDocument();
});

test('exibição de todos os cards de pokémons favoritados.', async () => {
  renderWithRouter(<App />);

  const moreDetailsLink = screen.getByRole('link', { name: /More details/i });
  userEvent.click(moreDetailsLink);

  const checkbox = screen.getByRole('checkbox');
  userEvent.click(checkbox);

  // https://developer.mozilla.org/pt-BR/docs/Web/API/Node/textContent
  const pokemonName = screen.getByTestId('pokemon-name').textContent;

  const favoritesLink = screen.getByRole('link', { name: /Favorite pokémons/i });
  userEvent.click(favoritesLink);

  const textPokemonName = screen.getByText(pokemonName);
  expect(textPokemonName).toBeInTheDocument();
});

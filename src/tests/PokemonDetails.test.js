import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => renderWithRouter(<App />));

test('Teste se as informações do pokémon selecionado são mostradas na tela', () => {
  const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(linkMoreDetails);

  const pikachuDetails = screen.getByText(/pikachu details/i);
  expect(pikachuDetails).toBeInTheDocument();
  expect(linkMoreDetails).not.toBeInTheDocument();

  const textSumary = screen.getByRole('heading', {
    name: /summary/i,
    level: 2,
  });
  expect(textSumary).toBeInTheDocument();
  const p = screen.getByText(
    /this intelligent pokémon roasts hard berries with electricity/i,
  );
  expect(p).toBeInTheDocument();
});

test('Teste se existe na página uma seção com os mapas do pokémon', () => {
  const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(linkMoreDetails);

  const textLocations = screen.getByRole('heading', {
    name: /Game Locations of Pikachu/i,
    level: 2,
  });
  expect(textLocations).toBeInTheDocument();

  const textLocation = screen.getByText('Kanto Viridian Forest');
  const textLocation2 = screen.getByText('Kanto Power Plant');
  const locationImg = screen.getAllByRole('img', { name: /Pikachu location/i });

  expect(locationImg[0]).toHaveAttribute('src', 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
  expect(locationImg[1]).toHaveAttribute('src', 'https://pwo-wiki.info/images/5/5b/Pp.gif');
  expect(locationImg[0]).toHaveAttribute('alt', 'Pikachu location');
  expect(locationImg[1]).toHaveAttribute('alt', 'Pikachu location');
  expect(textLocation).toBeInTheDocument();
  expect(textLocation2).toBeInTheDocument();
});

test('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
  const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(linkMoreDetails);

  const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
  expect(checkbox).toBeInTheDocument();
  userEvent.click(checkbox);

  const favoritesLink = screen.getByRole('link', { name: /Favorite pokémons/i });
  userEvent.click(favoritesLink);
  const pokemonName = screen.getByTestId('pokemon-name').textContent;
  const textPokemonName = screen.getByText(pokemonName);
  expect(textPokemonName).toBeInTheDocument();

  const linkMoreDetails2 = screen.getByRole('link', { name: /more details/i });
  userEvent.click(linkMoreDetails2);
  const checkbox2 = screen.getByRole('checkbox');
  userEvent.click(checkbox2);

  const favoritesLink2 = screen.getByRole('link', { name: /Favorite pokémons/i });
  userEvent.click(favoritesLink2);
  const textFavorite = screen.getByText('No favorite pokemon found');
  expect(textFavorite).toBeInTheDocument();
});

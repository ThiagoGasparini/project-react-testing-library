import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => renderWithRouter(
  <App />,
));

test('renderiza um card com as informações de determinado pokémon', async () => {
  const pokemonName = screen.getByText(/pikachu/i);
  expect(pokemonName).toBeInTheDocument();

  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType.innerHTML).toBe('Electric');

  const weight = screen.getByText(/average weight: 6\.0 kg/i);
  expect(weight).toBeInTheDocument();

  const pikachuImg = await screen.findByRole('img', { name: /pikachu sprite/i });
  expect(pikachuImg.src).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
  expect(pikachuImg).toHaveAttribute('alt', 'Pikachu sprite');
});

test('testa se contém um link de navegação para exibir detalhes', () => {
  const moreDetails = screen.getByRole('link', { name: /more details/i });

  expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
});

test('Teste se ao clicar é feito o redirecionamento da aplicação para a página', () => {
  const moreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);

  const textDetails = screen.getByText(/pikachu details/i);
  expect(textDetails).toBeInTheDocument();
});

test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
  const moreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetails);

  const favoritePokemon = screen.getByText(/pokémon favoritado?/i);
  userEvent.click(favoritePokemon);

  const favorite = screen.getByRole('img', {
    name: /pikachu is marked as favorite/i,
  });

  expect(favorite).toHaveAttribute('src', '/star-icon.svg');
});

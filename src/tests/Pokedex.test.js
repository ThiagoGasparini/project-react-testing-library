import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => renderWithRouter(
  <App />,
));

test('página contém um heading h2 com o texto Encountered pokémons', () => {
  const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
  expect(h2).toBeInTheDocument();
});

test('testa se é exibido o próximo Pokémon da lista', () => {
  const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

  expect(nextPokemon).toBeInTheDocument();
});

test('testa se é exibido um pokemon por vez', () => {
  const pokemon = screen.getAllByTestId('pokemon-name');

  expect(pokemon).toHaveLength(1);
});

test('testa se a pokedex tem os botões de filtro', () => {
  const filters = screen.getAllByTestId('pokemon-type-button');
  filters.forEach((button, index) => {
    expect(button).not.toEqual(filters[index + 1]);
  });
});

test('testa se a pokedex contém um botão para resetar o filtro', () => {
  const pokemon = screen.getByText('Pikachu');
  const button = screen.getByRole('button', { name: /all/i });
  userEvent.click(button);

  expect(pokemon).toBeInTheDocument();
});

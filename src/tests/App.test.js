import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Teste se contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);

  const nav = screen.getByRole('navigation');
  expect(nav).toBeInTheDocument();
});

test('Teste se o link Home direciona', () => {
  renderWithRouter(<App />);

  const linkHome = screen.getByRole('link', { name: /Home/i });
  userEvent.click(linkHome);

  const textHome = screen.getByRole('heading', {
    name: /Encountered pokémons/i,
    level: 2,
  });
  expect(textHome).toBeInTheDocument();
});

test('Teste se o link About direciona', () => {
  renderWithRouter(<App />);

  const linkAbout = screen.getByRole('link', { name: /About/i });
  userEvent.click(linkAbout);

  const textAbout = screen.getByRole('heading', {
    name: /About Pokédex/i,
    level: 2,
  });
  expect(textAbout).toBeInTheDocument();
});

test('Teste se o link Favorite Pokémons direciona', () => {
  renderWithRouter(<App />);

  const linkFavorites = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  userEvent.click(linkFavorites);

  const textFavorites = screen.getByRole('heading', {
    name: /Favorite Pokémons/i,
    level: 2,
  });
  expect(textFavorites).toBeInTheDocument();
});

test('Teste Not Found com URL desconhecida', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/pagina/que-nao-existe/');

  const notFound = screen.getByRole(
    'heading',
    { name: /Page requested not found/i, level: 2 },
  );
  expect(notFound).toBeInTheDocument();
});

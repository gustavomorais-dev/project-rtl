import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente App', () => {
  it('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByText(/home/i);
    const linkAbout = screen.getByText(/about/i);
    const linkFavoritePokemon = screen.getByText(/favorite pokémon/i);
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemon).toBeInTheDocument();
  });

  it('Redireciona para a página Home ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByText(/home/i);
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  it('Redireciona para a página About ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByText(/about/i);
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  it('Redireciona para a página de Pokémon Favoritados ao clicar no link de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokemon = screen.getByText(/favorite pokémon/i);
    userEvent.click(linkFavoritePokemon);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('renderiza a página de Not Found ao acessar uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pagina/que-nao-existe/');
    });
    const notFoundTitle = screen.getByRole('heading', { level: 2 });
    expect(notFoundTitle).toHaveTextContent('Page requested not found');
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import pokemonListMock from '../mocks/pokemonList';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente Pokemon', () => {
  it('Renderiza o card com as informações do pokémon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonListMock[0] }
      isFavorite
    />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 50.0 kg');

    const pokemonSprite = screen.getByAltText('Pikachu sprite');
    expect(pokemonSprite).toBeInTheDocument();
    expect(pokemonSprite).toHaveAttribute('src', pokemonListMock[0].image);
  });

  it('Renderiza um link para mais detalhes quando showDetailsLink é true', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonListMock[0] }
      isFavorite
      showDetailsLink
    />);
    const detailsLink = screen.getByRole('link');
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', '/pokemon/25');
  });

  it('Não renderiza o link de mais detalhes quando showDetailsLink é false', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonListMock[0] }
      isFavorite
      showDetailsLink={ false }
    />);
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('Redireciona para a página de detalhes do pokemon quando clica no link de mais detalhes', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemonListMock[0] }
      isFavorite
      showDetailsLink
    />);

    const detailsLink = screen.getByText('More details');

    userEvent.click(detailsLink);

    expect(history.location.pathname).toBe('/pokemon/25');
  });

  it('Deve mostrar o favicon quando isFavorite é true', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonListMock[0] } isFavorite />);

    const favicon = screen.getByAltText('Pikachu is marked as favorite');

    expect(favicon).toBeInTheDocument();
    expect(favicon).toHaveAttribute('src', '/star-icon.svg');
  });
});

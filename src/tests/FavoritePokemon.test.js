import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';

import favPokemonList from '../mocks/favPokemonList';

describe('Testa o componente FavoritePokemon', () => {
  it('É exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    const pokemonList = [];

    render(<FavoritePokemon
      pokemonList={ pokemonList }
    />);

    const noFavoritesMessage = screen.queryByText(/No favorite Pokémon found/i);

    expect(noFavoritesMessage).toBeInTheDocument();
  });

  it('Apenas são exibidos os Pokémon favoritados.', () => {
    renderWithRouter(<FavoritePokemon
      pokemonList={ favPokemonList }
    />);

    const pokemonComponents = screen.getAllByTestId('pokemon-name');
    expect(pokemonComponents.length).toBe(1);
  });
});

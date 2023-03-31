import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente FavoritePokemon', () => {
  it('É exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    const pokemonList = [];

    render(<FavoritePokemon pokemonList={ pokemonList } />);

    const noFavoritesMessage = screen.queryByText(/No favorite Pokémon found/i);

    expect(noFavoritesMessage).toBeInTheDocument();
  });

  it('Apenas são exibidos os Pokémon favoritados.', () => {
    const pokemonList = [
      {
        averageWeight: {
          measurementUnit: 'kg',
          value: '50.0',
        },
        foundAt: [
          {
            location: 'Kanto Route 3',
            map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 4',
            map: 'https://cdn2.bulbagarden.net/upload/3/3d/Kanto_Route_4_Map.png',
          },
        ],
        id: 25,
        image: 'https://cdn2.bulbagarden.net/upload/thumb/7/73/025Pikachu.png/250px-025Pikachu.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
        name: 'Pikachu',
        summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
        type: 'Electric',
      },
    ];

    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);

    const pokemonComponents = screen.getAllByTestId('pokemon-name');
    expect(pokemonComponents.length).toBe(1);
  });
});

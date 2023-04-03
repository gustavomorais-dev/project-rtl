import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';

import pokemonListMock from '../mocks/pokemonList';
import isPokemonFavoriteByIdMock from '../mocks/pokemonFavorite';

const nextButtonTestId = 'next-pokemon';

describe('Pokedex', () => {
  it('should render the heading with the text "Encountered Pokémon"', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonListMock }
      isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
    />);
    const heading = screen.getByRole('heading', { level: 2, name: 'Encountered Pokémon' });
    expect(heading).toBeInTheDocument();
  });

  it('should render the first pokemon of the list by default', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonListMock }
      isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
    />);
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
  });

  it('should render the next pokemon when clicking the "Próximo Pokémon" button', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonListMock }
      isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
    />);
    const nextButton = screen.getByTestId(nextButtonTestId);
    expect(nextButton).toHaveTextContent(/Próximo Pokémon/i);

    userEvent.click(nextButton);
    let pokemonName = screen.getByText('Chikorita');
    expect(pokemonName).toBeInTheDocument();

    userEvent.click(nextButton);
    pokemonName = screen.getByText('Mareep');
    expect(pokemonName).toBeInTheDocument();

    userEvent.click(nextButton);
    pokemonName = screen.getByText('Charmander');
    expect(pokemonName).toBeInTheDocument();

    userEvent.click(nextButton);
    pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
  });

  test('only one Pokemon is displayed at a time', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonListMock }
      isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
    />);

    const nextButton = screen.getByTestId(nextButtonTestId);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Chikorita')).not.toBeInTheDocument();
    expect(screen.queryByText('Mareep')).not.toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();

    userEvent.click(nextButton);

    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    expect(screen.getByText('Chikorita')).toBeInTheDocument();
    expect(screen.queryByText('Mareep')).not.toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
  });

  it('Renderiza os botões de filtro corretamente', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonListMock }
      isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
    />);

    const pokemonTypes = ['Electric', 'Grass', 'Fire'];

    const typeButtons = pokemonTypes.map((type) => {
      const allTypeButtons = screen.getAllByTestId('pokemon-type-button');
      const typeButton = allTypeButtons.find((button) => button.textContent === type);
      expect(typeButton).toBeInTheDocument();
      return typeButton;
    });

    expect(typeButtons).toHaveLength(pokemonTypes.length);
  });

  it('O botão All está sempre visível e é possível clicar nele', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonListMock }
      isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
    />);

    const nextButton = screen.getByTestId(nextButtonTestId);

    const allButtonsOnPage = screen.getAllByRole('button');
    const allButton = allButtonsOnPage.find((button) => button.textContent === 'All');
    expect(allButton).toBeInTheDocument();

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Chikorita')).not.toBeInTheDocument();
    userEvent.click(nextButton);
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    expect(screen.getByText('Chikorita')).toBeInTheDocument();
    userEvent.click(allButton);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Chikorita')).not.toBeInTheDocument();
  });

  it('É possível alternar entre os tipos clicando nos botões de tipo', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonListMock }
      isPokemonFavoriteById={ isPokemonFavoriteByIdMock }
    />);

    const allButtonsOnPage = screen.getAllByRole('button');
    const fireButton = allButtonsOnPage.find((button) => button.textContent === 'Fire');
    const electricButton = allButtonsOnPage.find((button) => button.textContent === 'Electric');
    expect(fireButton).toBeInTheDocument();
    expect(electricButton).toBeInTheDocument();

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
    userEvent.click(fireButton);
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(electricButton);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
  });
});

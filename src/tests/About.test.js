import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Testes do componente About', () => {
  test('A página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const aboutText = screen.getByText(/This application simulates a Pokédex, a/i);
    expect(aboutText).toBeInTheDocument();
  });

  test('A página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const aboutHeading = screen.getByRole('heading', { level: 2 });
    expect(aboutHeading).toHaveTextContent('About Pokédex');
  });

  test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/One can filter Pokémon by type/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('A página contém a imagem de uma Pokédex', () => {
    render(<About />);
    const aboutImage = screen.getByAltText('Pokédex');
    expect(aboutImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

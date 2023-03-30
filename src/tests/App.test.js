import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

describe('Teste do componente App', () => {
  test('renders App component', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    const linkHome = screen.getByText(/home/i);
    const linkAbout = screen.getByText(/about/i);
    const linkFavoritePokemon = screen.getByText(/favorite pokémon/i);
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemon).toBeInTheDocument();
  });
});

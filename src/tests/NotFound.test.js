import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Testes do NotFound', () => {
  it('A página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Page requested not found');
  });

  it('A página mostra a imagem correta', () => {
    render(<NotFound />);
    const image = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

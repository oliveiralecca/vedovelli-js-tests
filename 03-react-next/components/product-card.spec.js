/*
 *   -> new RegExp() ajuda a deixar a busca por texto com o screen.getByText() um pouco mais abrangente
 *     - argumento 'i' => case-insensitive
 */

import { screen, render } from '@testing-library/react';
import ProductCard from './product-card';

const product = {
  title: 'Relógio de teste',
  price: '13.00',
  image: 'https://source.unsplash.com/random',
};

describe('ProductCard', () => {
  it('should render ProductCard', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText(new RegExp(product.title, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument();
    expect(screen.getByTestId('image')).toHaveStyle({
      backgroundImage: product.image,
    });
  });
});

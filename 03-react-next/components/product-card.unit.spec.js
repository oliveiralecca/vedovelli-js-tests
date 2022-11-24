/*
*   -> new RegExp() ajuda a deixar a busca por texto com o screen.getByText() um pouco mais abrangente
*     - argumento 'i' => case-insensitive
*   -> marco como async as implementações que precisam de um click, por exemplo => async () => {}
*/

import { screen, render, fireEvent } from '@testing-library/react';
import ProductCard from './product-card';

const product = {
  title: 'Relógio de teste',
  price: '13.00',
  image: 'https://source.unsplash.com/random',
};

const addToCart = jest.fn();

const renderProductCard = () => {
  render(<ProductCard product={product} addToCart={addToCart} />);
};

describe('ProductCard', () => {
  it('should render ProductCard', () => {
    renderProductCard();

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    renderProductCard();

    expect(
      screen.getByText(new RegExp(product.title, 'i')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(product.price, 'i')),
    ).toBeInTheDocument();
    expect(screen.getByTestId('image')).toHaveStyle({
      backgroundImage: product.image,
    });
  });

  it('should call props.addToCart() when button gets clicked', async () => {
    renderProductCard();

    const button = screen.getByRole('button');

    await fireEvent.click(button);

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product);
  });
});

/*
 *   -> it.todo('description') => testes a fazer, servem como um lembrete dos próximos testes a serem implementados
 *   -> screen.getByTestId('') => retorna um nó, uma tag HTML, porém, quando estou interessada no conteúdo dessa tag, posso usar um .textContent por exemplo
 */

import { screen, render, fireEvent } from '@testing-library/react';
import CartItem from './cart-item';

const product = {
  title: 'Relógio de teste',
  price: '13.00',
  image: 'https://source.unsplash.com/random',
};

const renderCartItem = () => {
  render(<CartItem product={product} />);
};

describe('CartItem', () => {
  it('should render CartItem', () => {
    renderCartItem();

    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    renderCartItem();

    const image = screen.getByTestId('image');

    expect(
      screen.getByText(new RegExp(product.title, 'i')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(product.price, 'i')),
    ).toBeInTheDocument();
    expect(image).toHaveProperty('src', product.image);
    expect(image).toHaveProperty('alt', product.title);
  });

  it('should display 1 as initial quantity', () => {
    renderCartItem();

    expect(screen.getByTestId('quantity').textContent).toBe('1');
  });

  it('should increase quantity by 1 when second button is clicked', async () => {
    renderCartItem();

    const [_, button] = screen.getAllByRole('button');

    await fireEvent.click(button);

    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });

  it.todo('should decrease quantity by 1 when first button is clicked');

  it.todo('should not go below zero in the quantity');
});

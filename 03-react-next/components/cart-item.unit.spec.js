/*
 *   -> it.todo('description') => testes a fazer, servem como um lembrete dos próximos testes a serem implementados
 *   -> screen.getByTestId('') => retorna um nó, uma tag HTML, porém, quando estou interessada no conteúdo dessa tag, posso usar um .textContent por exemplo
 */

import { screen, render, fireEvent } from '@testing-library/react';
import CartItem from './cart-item';
import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react-hooks';
import { useCartStore } from '../store/cart';
import { setAutoFreeze } from 'immer';

setAutoFreeze(false);

const product = {
  title: 'Relógio de teste',
  price: '13.00',
  image: 'https://source.unsplash.com/random',
};

const renderCartItem = () => {
  render(<CartItem product={product} />);
};

describe('CartItem', () => {
  let result;

  beforeEach(() => {
    result = renderHook(() => useCartStore()).result;
  })

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

  it('should call remove() when remove button is clicked', async () => {
    const spy = jest.spyOn(result.current.actions, 'remove');

    renderCartItem();

    const button = screen.getByRole('button', { name: /remove/i });

    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });

  it('should call increase() when increase button is clicked', async () => {
    const spy = jest.spyOn(result.current.actions, 'increase');

    renderCartItem();

    const button = screen.getByTestId('increase');

    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });

  it('should call decrease() when decrease button is clicked', async () => {
    const spy = jest.spyOn(result.current.actions, 'decrease');

    renderCartItem();

    const button = screen.getByTestId('decrease');

    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(product);
  });
});

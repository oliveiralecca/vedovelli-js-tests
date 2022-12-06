/*
 *  -> O método .spyOn() do Jest nos permite "espionar" um método que é importado e ocorre direto no componente, e não é passado por prop (como o método toggle() lá no cart que vem direto da Store e não por prop). Dessa forma, nos testes não temos como passar uma mock function para o componente e testar, aí entra o .spyOn()
 *  -> o act() do TestRenderer (componentsAct) é necessário quando há interação com a DOM do componente renderizado no teste, como o clique num botão. Nesse caso, um warning avisará no terminal a necessidade de usá-lo
 */

import { renderHook, act as hooksAct } from '@testing-library/react-hooks';
import { screen, render } from '@testing-library/react';
import { useCartStore } from '../store/cart';
import { makeServer } from '../miragejs/server';
import { setAutoFreeze } from 'immer';
import userEvent from '@testing-library/user-event';
import Cart from './cart';
import TestRenderer from 'react-test-renderer';

const { act: componentsAct } = TestRenderer;

setAutoFreeze(false);

describe('Cart', () => {
  let server;
  let result;
  let spy;
  let add;
  let toggle;
  let reset;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(() => useCartStore()).result;
    add = result.current.actions.add;
    toggle = result.current.actions.toggle;
    reset = result.current.actions.reset;
    spy = jest.spyOn(result.current.actions, 'toggle');
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  it('should add CSS class "hidden" in the component', () => {
    render(<Cart />);

    expect(screen.getByTestId('cart')).toHaveClass('hidden');
  });

  it('should remove CSS class "hidden" in the component', async () => {
    await componentsAct(async () => {
      render(<Cart />);

      await userEvent.click(screen.getByTestId('close-button'));

      expect(screen.getByTestId('cart')).not.toHaveClass('hidden');
    });
  });

  it('should call store toggle() twice', async () => {
    await componentsAct(async () => {
      render(<Cart />);

      const button = screen.getByTestId('close-button');

      await userEvent.click(button);
      await userEvent.click(button);

      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  it('should display 2 products cards', () => {
    const products = server.createList('product', 2);

    hooksAct(() => {
      for (const product of products) {
        add(product);
      }
    });

    render(<Cart />);

    expect(screen.getAllByTestId('cart-item')).toHaveLength(2);
  });

  it('should remove all products when clear cart button is clicked', async () => {
    const products = server.createList('product', 2);

    hooksAct(() => {
      for (const product of products) {
        add(product);
      }
    });

    await componentsAct(async () => {
      render(<Cart />);

      expect(screen.getAllByTestId('cart-item')).toHaveLength(2);

      const button = screen.getByRole('button', { name: /clear cart/i });

      await userEvent.click(button);

      expect(screen.queryAllByTestId('cart-item')).toHaveLength(0);
    });
  });

  it('should not display clear cart button if no products are in the cart', async () => {
    render(<Cart />);

    expect(screen.queryByRole('button', { name: /clear cart/i })).not.toBeInTheDocument();
  });
});

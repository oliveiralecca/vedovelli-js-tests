/*
 *   -> O método act() da Testing Library React Hooks serve para executarmos ações dentro de um hook
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { useCartStore } from '.';
import { makeServer } from '../../miragejs/server';

describe('Cart Store', () => {
  let server;
  let result;
  let add;
  let remove;
  let removeAll;
  let toggle;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
    result = renderHook(() => useCartStore()).result;
    add = result.current.actions.add;
    remove = result.current.actions.remove;
    removeAll = result.current.actions.removeAll;
    toggle = result.current.actions.toggle;
  });

  afterEach(() => {
    server.shutdown();
    act(() => result.current.actions.reset());
  });

  it('should return open equals false on initial state', () => {
    expect(result.current.state.open).toBe(false);
  });

  it('should return an empty array for products on initial state', () => {
    expect(Array.isArray(result.current.state.products)).toBe(true);
    expect(result.current.state.products).toHaveLength(0);
  });

  it('should add 2 products to the list and open the cart', async () => {
    const products = server.createList('product', 2);

    for (const product of products) {
      act(() => add(product));
    }

    expect(result.current.state.products).toHaveLength(2);
    expect(result.current.state.open).toBe(true);
  });

  it('should not add same product twice', () => {
    const product = server.create('product');

    act(() => add(product));
    act(() => add(product));

    expect(result.current.state.products).toHaveLength(1);
  });

  it('should toggle open state', () => {
    expect(result.current.state.open).toBe(false);
    expect(result.current.state.products).toHaveLength(0);

    act(() => toggle());
    expect(result.current.state.open).toBe(true);

    act(() => toggle());
    expect(result.current.state.open).toBe(false);

    expect(result.current.state.products).toHaveLength(0);
  });

  it('should remove a product from the store', () => {
    const [productA, productB] = server.createList('product', 2);

    act(() => {
      add(productA);
      add(productB);
    });

    expect(result.current.state.products).toHaveLength(2);

    act(() => {
      remove(productA);
    });

    expect(result.current.state.products).toHaveLength(1);
    expect(result.current.state.products[0]).toEqual(productB);
  });

  it('should not change products in the cart if provided product is not in the array', () => {
    const [productA, productB, productC] = server.createList('product', 3);

    act(() => {
      add(productA);
      add(productB);
    });

    expect(result.current.state.products).toHaveLength(2);

    act(() => {
      remove(productC);
    });

    expect(result.current.state.products).toHaveLength(2);
  });

  it('should clear cart', () => {
    const products = server.createList('product', 2);

    act(() => {
      for (const product of products) {
        add(product);
      }
    });

    expect(result.current.state.products).toHaveLength(2);

    act(() => removeAll());

    expect(result.current.state.products).toHaveLength(0);
  });
});

/*
 *   -> Caso o relatório de coverage acuse que falta testar alguma linha de um arquivo, mas é de fato desnecessário testar essa linha, basta comentar acima dela com // istanbul ignore next
 *     - "istanbul" é a ferramenta que o Jest usa para gerar o relatório de coverage
 */

import { renderHook } from '@testing-library/react-hooks';
import { useFetchProducts } from './useFetchProducts';
import { makeServer } from '../miragejs/server';
import Response from 'miragejs';

describe('useFetchProducts', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should return a list of 10 products', async () => {
    server.createList('product', 10);

    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());

    await waitForNextUpdate();

    expect(result.current.products).toHaveLength(10);
    expect(result.current.error).toBe(false);
  });

  it('should set error to true when catch() block is executed', async () => {
    server.get('products', () => {
      return new Response(500, {}, '');
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());

    await waitForNextUpdate();

    expect(result.current.error).toBe(true);
    expect(result.current.products).toHaveLength(0);
  });
});

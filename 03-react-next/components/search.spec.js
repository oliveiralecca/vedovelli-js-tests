/*
 *   -> Ferramentas adicionadas pela Testing Library
 *     - render => monta o componente
 *     - screen => faz referência a qualquer coisa retornada pelo componente
 *     - screen.debug() => ver o que está sendo retornado do componente diretamente no terminal
 *     - fireEvent => dispara eventos, retornando uma Promise (tem que usar async/await)
 *   -> Ferramentas do próprio Jest
 *     - .toHaveBeenCalledTimes(1) => determina quantas vezes quero que um método seja executado
 *     - jest.fn() => provê uma mock function para fins de testes
 */

import Search from './search';
import { render, screen, fireEvent } from '@testing-library/react';

const doSearch = jest.fn();

describe('Search', () => {
  it('should render a form', () => {
    render(<Search doSearch={doSearch} />);

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should call props.doSearch() when form is submitted', async () => {
    render(<Search doSearch={doSearch} />);

    const form = screen.getByRole('form');

    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledTimes(1);
  });
});

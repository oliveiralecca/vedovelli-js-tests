/*
 *   -> Ferramentas adicionadas pela Testing Library
 *     - render => monta o componente
 *     - screen => faz referência a qualquer coisa retornada pelo componente
 *     - screen.debug() => ver o que está sendo retornado do componente diretamente no terminal, e um elemento pode ser passado como argumento para ser "pesquisado" no retorno
 *     - fireEvent => dispara eventos, retornando uma Promise (tem que usar async/await)
 *     - userEvent => provê eventos mais próximos do que o usuário faz em tela, como digitar num input
 *   -> Ferramentas do próprio Jest
 *     - .toHaveBeenCalledTimes(1) => determina quantas vezes quero que um método seja executado
 *     - jest.fn() => provê uma mock function para fins de testes
 */

import Search from './search';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const doSearch = jest.fn();

describe('Search', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a form', () => {
    render(<Search doSearch={doSearch} />);

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should render a input type equals search', () => {
    render(<Search doSearch={doSearch} />);

    expect(screen.getByRole('searchbox')).toHaveProperty('type', 'search');
  });

  it('should call props.doSearch() when form is submitted', async () => {
    render(<Search doSearch={doSearch} />);

    const form = screen.getByRole('form');

    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledTimes(1);
  });

  it('should call props.doSearch() with the user input', async () => {
    render(<Search doSearch={doSearch} />);

    const inputText = 'some text here';
    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, inputText);
    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledWith(inputText);
  });

  it('should call props.doSearch() when search input is cleared', async () => {
    render(<Search doSearch={doSearch} />);

    const inputText = 'some text here';
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, inputText);
    await userEvent.clear(input);

    expect(doSearch).toHaveBeenCalledTimes(1);
    expect(doSearch).toHaveBeenCalledWith('');
  });
});

/*
*   -> Ferramentas adicionadas pela Testing Library
*     - render => monta o componente
*     - screen => faz referência a qualquer coisa retornada pelo componente
*     - screen.debug() => ver o que está sendo retornado do componente diretamente no terminal
*/

import Search from './search';
import { render, screen } from '@testing-library/react'; 

describe('Search', () => {
  it('should render Search component', () => {
    render(<Search />);

    expect(screen.getByTestId('search')).toBeInTheDocument();
  });
});

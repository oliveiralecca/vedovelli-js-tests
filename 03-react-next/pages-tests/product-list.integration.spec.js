/*
*   -> Para os integration tests precisamos de uma fonte de dados, mas uma fonte de dados local, não uma fonte de dados externa. Porque os testes jamais podem depender de algo que não temos controle, como dados vindos de uma api
*     - o MirageJS serve para isso => construir uma base de dados local, no front-end
*/

import { screen, render, waitFor } from '@testing-library/react';
import ProductList from '../pages';

const renderProductList = () => {
  render(<ProductList />);
};

describe('ProductList', () => {
  it('should render ProductList', () => {
    renderProductList();

    expect(screen.getByTestId('product-list')).toBeInTheDocument();
  });

  fit('should render the ProductCard component 10 times', async () => {
    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId('product-card')).toHaveLength(10);
    });
  });

  it.todo('should render the no products message');
  it.todo('should render the Search component');
  it.todo('should filter the product list when a search is performed');
  it.todo('should display error message when promise rejects');
  it.todo('should display the total quantity of products');
  it.todo('should display product (singular) when there is only 1 product');
});

import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import { createStore, combineReducers } from 'redux';
import clickReducer from './reducers';

const renderWithRedux = (
  component,
  { initialState, store = createStore(combineReducers({ clickReducer }), initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

describe('testing clicks', () => {
  beforeEach(cleanup);
  test('the page should has a button and a text 0', () => {
    const {queryByText} = renderWithRedux(<App />);
    const buttonAdd = queryByText('Clique aqui');

    expect(buttonAdd).toBeInTheDocument();
    expect(queryByText('0')).toBeInTheDocument();
  });

  test('a click in a button should increment the value of clicks', () => {
    const { getByRole } = renderWithRedux(<App />, {initialState: {clickReducer: { counter: 5 }}});
    const btnAdd = getByRole('button');
    fireEvent.click(btnAdd);
    expect(btnAdd).toBeInTheDocument();
  });

  test('teste se click funciona', () => {
    const {getByRole} = renderWithRedux(<App />);
    fireEvent.click(getByRole('button'));
  })

  test('Altere o valor inicial do counter para 10,'
  +'faça um clique do botão e crie os testes para esses comportamentos.', () => {
    const { getByRole} = renderWithRedux(<App />, {initialState: {clickReducer: { counter: 10 }}});
    const btnAdd = getByRole('button');
    fireEvent.click(btnAdd);
    expect(btnAdd).toBeInTheDocument();
  });
});


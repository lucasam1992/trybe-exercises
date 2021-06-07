    // App.test.js
    import React from 'react';
    import { fireEvent, getByText, render } from '@testing-library/react';
    import App from './App';
    
    test('Verificando se existe o campo Email.', () => {
      const { getByLabelText } = render(<App />);
      const inputEmail = getByLabelText('Email');
      expect(inputEmail).toBeInTheDocument();
      expect(inputEmail.type).toBe('email');
    });

    test('Verificar botao', () => {
      const { getByTestId } = render(<App />);
      const btn = getByTestId('id-send');
      expect(btn).toBeInTheDocument();
      expect(btn.type).toBe('button');
      expect(btn).toHaveValue('Enviar');
    });

    test('Verificar quantidade de botoes', () => {
      const { getAllByRole } = render(<App />);
      const btns = getAllByRole('button');
      expect(btns.length).toBe(2);
    });

    test('Verificando se o botão e o campo email estão funcionando.', () => {
      const { getByTestId, getByLabelText } = render(<App />);

      const EMAIL_USER = 'email@gmail.com';

      const textEmail = getByTestId('id-email-user');
      expect(textEmail).toBeInTheDocument();
      expect(textEmail).toHaveTextContent('Valor:');

      const btnSend = getByTestId('id-send');
      const inputEmail = getByLabelText('Email');
      fireEvent.change(inputEmail, { target: {value: EMAIL_USER }});
      fireEvent.click(btnSend);
      expect(inputEmail).toHaveValue('');
      expect(textEmail).toHaveTextContent(`Valor: ${EMAIL_USER}`);
    });
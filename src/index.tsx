import React from 'react';
import { render } from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Salario',
          type: 'deposit',
          category: 'Trabalho',
          amount: 14000,
          createdAt: new Date('2021-08-27 05:30:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'expense',
          category: 'Casa',
          amount: 2500,
          createdAt: new Date('2021-08-01 12:00:00')
        }
      ]
    })
  },

  routes(){
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    });
  }
});

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
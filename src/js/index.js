// import { voca } from '../lib/index';
import { voca } from '../../index.js';


voca.get('https://jsonplaceholder.typicode.com/todos')
    .then(data => console.log(data));


const API = voca.create(window.fetch, {
    onRequest: (method, route, data = undefined) => ({
      url: `${route}`,
      body: JSON.stringify(data),
      method,
      headers: { 'Content-Type': 'application/json' }
    }),
    onResponse: (response) => {
      if (response.status === 403) throw new Error('Authorization error.');
      return response.json();
    },
    onError: () => {
      return Promise.reject();
    },
});

API('GET', 'https://jsonplaceholder.typicode.com/todos').then((json) => console.log(json));

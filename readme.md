<div align="center">
	<br>
	<div>
		<img width="300" height="300" src="assets/images/voca-logo.png" alt="voca-http">
	</div>
	<br>
</div>

# Voca HTTP

The voca-http is a very tiny wrapper for the Fetch API. No other dependency added in this library.

## How to use Voca HTTP

```JavaScript
import { voca } from 'voca-http';

// get API call 
voca.get('https://jsonplaceholder.typicode.com/todos')
	.then(data => console.log(data));
	
// post API call 
voca.get(
	'https://jsonplaceholder.typicode.com/todos', 
	{"id": 1, "value": "test"}
).then(data => console.log(data));

```

## How to create Voca HTTP instance
The custom instance will help you to send custom headers, base url etc. Here is the example code how you create custom Voca HTTP instance.

```JavaScript
// create instance
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

// get API call 
API(
	'GET',
	'https://jsonplaceholder.typicode.com/todos'
)
.then((json) => console.log(json));
```

## Browser support

The latest version of Chrome, Firefox, and Safari.

## Maintainer
- [Subhojit Mondal](https://github.com/Subhojit1992)

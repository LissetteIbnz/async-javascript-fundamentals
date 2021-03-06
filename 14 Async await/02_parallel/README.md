## In this demo we are going to use `Promise.all`.

* Ensure that the `src/api` looks this way

``` javascript
export async function fetchFromAPI(endpoint) {
    const url = `http://localhost:8000/api${endpoint}`;
    const response = await fetch(url); // ok
    return await response.json();
}
```

### 1. We can await multiple async operations using `Promise.all` method.

```javascript app.js
import { 
     fetchFromAPI
} from './api/bookAPI';

const showBooksAndAuthors = async () => {
    const results = await Promise.all([
        fetchFromAPI(`/books/`),
        fetchFromAPI(`/authors/`)
    ]);

    const books = results[0];
    const authors = results[1];

    console.log(`Books: ${books.length}, Authors: ${authors.length}`);
};

showBooksAndAuthors();

```

* Promise.all, accepts a sequence of promises an returns a single new promise. 
* If all passed promise are resolved the resulting promise it's resolved as well, otherwise will reject the promise.
* Promise.all works with any iterable.
* The order of the values in array are the order of the promises on results

### 2. We can refactor this code using deestructuring on array

```diff app.js
import { 
     fetchFromAPI
} from './api/bookAPI';

const showBooksAndAuthors = async () => {
-    const results = await Promise.all([
+    const [books, authors] = await Promise.all([
        fetchFromAPI(`/books/`),
        fetchFromAPI(`/authors/`)
    ]);

-    const books = results[0];
-    const authors = results[1];

    console.log(`Books: ${books.length}, Authors: ${authors.length}`);
};

showBooksAndAuthors();

``` 

# Lazy Sort

A lazy sorting algorithm for JavaScript.

> ⚠️ This project, ironically, uses an extremely inefficient algorithm and should not be used in production. [wiki](https://pt.wikipedia.org/wiki/Sleep_sort), [reddit](https://www.reddit.com/r/programminghorror/comments/lgsd18/i_present_sleepsort/)

## Installation

To install Lazy Sort, use npm:

```bash
npm install lazy-sort
```

## Usage

```javascript
import { sort } from 'lazy-sort';

const data = [
      { name: 'Carlos', age: 300 },
      { name: 'Ana', age: 10 },
      { name: 'Bruno', age: 50 }
    ];

const sorted = await sort(data, 'age');

console.log(sortedArray);
// Output: [
//   { name: 'Ana', age: 10 },
//   { name: 'Bruno', age: 50 },
//   { name: 'Carlos', age: 300 }
// ]
```


```javascript
import { sort } from 'lazy-sort';

const data = [
      { name: 'Charlie', createdAt: '2024-03-15T08:00:00.000Z' },
      { name: 'Alice', createdAt: '2024-01-20T14:30:00.000Z' },
      { name: 'Alice', createdAt: '2023-11-10T09:15:00.000Z' },
      { name: 'Bob', createdAt: '2024-02-05T18:45:00.000Z' }
    ];

const sorted = await sort(data, 'name', 'createdAt');

console.log(sortedArray);
// Output: [
//   { name: 'Alice', createdAt: '2023-11-10T09:15:00.000Z' },
//   { name: 'Alice', createdAt: '2024-01-20T14:30:00.000Z' },
//   { name: 'Bob', createdAt: '2024-02-05T18:45:00.000Z' },
//   { name: 'Charlie', createdAt: '2024-03-15T08:00:00.000Z' }
// ]
```
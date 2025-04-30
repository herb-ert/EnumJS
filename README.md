# 🧩 Enum.js

A lightweight, versatile utility class for creating and managing enumerable values in JavaScript. Great for maintaining clean, ordered value sets like directions, states, roles, and more.

[![NPM version](https://img.shields.io/npm/v/@herb-ert/enumjs)](https://www.npmjs.com/package/@herb-ert/enumjs)
[![NPM downloads](https://img.shields.io/npm/dw/@herb-ert/enumjs)](https://www.npmjs.com/package/@herb-ert/enumjs)
[![GitHub issues](https://img.shields.io/github/issues/herb-ert/enumjs)](https://github.com/herb-ert/enumjs/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/herb-ert/enumjs)](https://github.com/herb-ert/enumjs/pulls)
[![GitHub contributors](https://img.shields.io/github/contributors/herb-ert/enumjs)](https://github.com/herb-ert/enumjs/graphs/contributors)
[![GitHub forks](https://img.shields.io/github/forks/herb-ert/enumjs)](https://github.com/herb-ert/enumjs/network)
[![GitHub stars](https://img.shields.io/github/stars/herb-ert/enumjs)](https://github.com/herb-ert/enumjs/stargazers)

## ✨ Features

- Create immutable, ordered enumerations
- Access values by index, label, or relative position
- Supports iteration, mapping, filtering, and other functional utilities
- Easily retrieve first, last, random, and adjacent values
- Enhanced validation for enum values
- Works in both Node.js and browser environments
- Fully documented and tested

## 📦 Installation

```bash
npm install @herb-ert/enumjs
```

If you're using ES Modules:
```js
import Enum from '@herb-ert/enumjs';
```

Or with CommonJS:
```js
const Enum = require('@herb-ert/enumjs');
```

## 🚀 Usage
```js
const Directions = new Enum('NORTH', 'EAST', 'SOUTH', 'WEST');

console.log(Directions.NORTH);        // "NORTH"
console.log(Directions.values);       // ["NORTH", "EAST", "SOUTH", "WEST"]
console.log(Directions.next('EAST')); // "SOUTH"
console.log(Directions.random());     // Randomly picks one of the directions
console.log([...Directions]);         // ["NORTH", "EAST", "SOUTH", "WEST"]
```

## 🧰 API

### Constructor
```js
new Enum(...values)
```

### Properties

| Name      | Description                      |
|-----------|----------------------------------|
| `values`  | Array of all enum values         |
| `length`  | Number of values in the enum     |
| `first`   | First value                      |
| `last`    | Last value                       |

---

### Methods

| Method                             | Description                                                                                                 |
|------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `Enum.of(...args)`                 | Creates a new instance of the Enum class with the provided arguments.                                       |
| `next(currentValue)`               | Retrieves the next value in the sequence from the `values` array.                                           |
| `previous(currentValue)`           | Retrieves the previous value in the `values` array relative to the given current value.                     |
| `compare(firstValue, secondValue)` | Compares the positions of two values within the `values` array and determines their relative difference.    |
| `getByIndex(index)`                | Retrieves the value at the specified index from the `values` array.                                         |
| `has(value)`                       | Checks if a specified value exists in the collection.                                                       |
| `indexOf(value)`                   | Returns index of `value` or `-1`                                                                            |
| `toString(value)`                  | Converts the current instance into its string representation.                                               |
| `isFirst(value)`                   | Checks if the provided value is the first element in the `values` array.                                    |
| `isLast(value)`                    | Checks if the provided value is the last element in the array `values` array.                               |
| `random()`                         | Retrieves a random element from the `values` array.                                                           |
| `filter(predicate)`                | Filters the values of the current instance based on a provided predicate function.                          |
| `some(predicate)`                  | Checks if at least one element in the array satisfies the provided testing function.                        |
| `every(predicate)`                 | Evaluates whether all elements in the `values` array satisfy the provided predicate function.               |
| `map(callback)`                    | Applies a callback function to each element in the `values` array and returns a new array with the results. |
| `reduce(callback, initialValue)`   | Reduces the array to a single value using a provided callback function.                                     |
| `forEach(callback)`                | Iterates over each element in the collection and executes the provided callback function.                   |
| `[Symbol.iterator]()`              | Returns the default iterator for the object.                                                                |

## 📦 More Examples

### Creating Enums

You can instantiate an enum in two equivalent ways:

```js
const Roles1 = new Enum('USER', 'MODERATOR', 'ADMIN');  // Using the constructor
const Roles2 = Enum.of('USER', 'MODERATOR', 'ADMIN');   // Via the static helper
```

### Accessing Basic Properties
```js
console.log(Roles2.values)            // ['USER', 'MODERATOR', 'ADMIN']
console.log(Roles2.first);            // "USER"       — the first value in the enum
console.log(Roles2.last);             // "ADMIN"      — the last value in the enum
console.log(Roles2.length)            // 3
```

### Functional Utilities
Enum supports most of the array utility methods. Here's how you can use them.
```js
const Status = Enum.of('IDLE', 'RUNNING', 'DONE');

console.log(Status.some(s => s.startsWith('R')));           // true  (because "RUNNING" starts with "R")
console.log(Status.every(s => typeof s === 'string'));      // true  (all values are strings)
console.log(Status.map(s => s.toLowerCase()));              // ["idle", "running", "done"]
console.log(Status.reduce((acc, val) => acc + val[0], '')); // "IRD"  (concatenates first letters of each status)
const Short = Status.filter(s => s.length <= 4);            // ["IDLE", "DONE"]
console.log(Status.random());                               // e.g. "RUNNING"
```

### Iteration
Enums are iterable, so you can spread or loop over them.
```js
for (const s of Status) {
  console.log(s);
}

console.log([...Status]); // ["IDLE", "RUNNING", "DONE"]
```

## 🧪 Validation
The constructor will throw an error if:
Any value is not a string
There are duplicate values

```js
new Enum('A', 'B', 42);       // ❌ TypeError: Enum values must be strings. Invalid entries: 42
new Enum('A', 'B', 'A');      // ❌ Error: Enum values must be unique. Duplicates found: RED
```

## 🔧 License
MIT © herb-ert

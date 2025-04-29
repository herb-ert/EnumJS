# 🧩 Enum.js

A lightweight, versatile utility class for creating and managing enumerable values in JavaScript. Great for maintaining clean, ordered value sets like directions, states, roles, and more.

## ✨ Features

- Create immutable, ordered enumerations
- Access values by index, label, or relative position
- Supports iteration, mapping, filtering, and other functional utilities
- Easily retrieve `first`, `last`, `random`, and adjacent values
- Works in both Node.js and browser environments
- Fully documented and tested

## 📦 Installation

```bash
npm install enumjs
```

If you're using ES Modules, import it like this:
```js
import Enum from 'enumjs';
```

Or with CommonJS:
```js
const Enum = require('enumjs');
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

| Method               | Description                                                  |
|----------------------|--------------------------------------------------------------|
| `next(value)`        | Returns the next value after `value` or `null`               |
| `previous(value)`    | Returns the previous value before `value` or `null`          |
| `compare(a, b)`      | Returns index difference between `a` and `b`                 |
| `getByIndex(i)`      | Gets value at index `i` or `null`                            |
| `has(value)`         | Checks if `value` exists                                     |
| `indexOf(value)`     | Returns index of `value` or `-1`                             |
| `isFirst(value)`     | Returns `true` if `value` is the first element               |
| `isLast(value)`      | Returns `true` if `value` is the last element                |
| `random()`           | Returns a random value from the enum                         |
| `filter(fn)`         | Returns a new `Enum` with values that match the predicate    |
| `map(fn)`            | Returns a mapped array from the enum values (not an `Enum`)  |
| `forEach(fn)`        | Executes `fn` for each value in the enum                     |
| `toString()`         | Returns `Enum(A, B, C)` as a string                          |
| `[Symbol.iterator]`  | Supports spreading (`...`) and iteration                     |

## 📦 Example
```js
const Roles = new Enum('USER', 'MODERATOR', 'ADMIN');

console.log(Roles.first);          // "USER"
console.log(Roles.last);           // "ADMIN"
console.log(Roles.has('MODERATOR')) // true
console.log(Roles.getByIndex(1));  // "MODERATOR"
```

## 🔧 License
MIT © herb-ert
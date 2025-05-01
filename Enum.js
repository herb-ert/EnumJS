/**
 * The `Enum` class is used to create an immutable collection of unique values.
 * Each value becomes a property of the `Enum` instance, allowing easy access
 * and manipulation of the collection as a group or as individual items.
 */
export default class Enum {
  constructor(...args) {
    const nonStrings = args.filter(v => typeof v !== 'string');
    if (nonStrings.length) {
      throw new TypeError(
        `Enum values must be strings. Invalid entries: ${[...new Set(nonStrings)]
        .map(v => JSON.stringify(v))
        .join(', ')}`,
      );
    }

    const uniqueValues = [...new Set(args)];
    if (uniqueValues.length !== args.length) {
      const duplicates = args.filter((item, index) => args.indexOf(item) !== index);
      throw new Error(`Enum values must be unique. Duplicates found: ${[...new Set(duplicates)].join(', ')}`);
    }

    Object.defineProperties(this, {
      values: {
        value: Object.freeze(uniqueValues),
        writable: false,
        enumerable: false,
      },
      ...Object.fromEntries(
        uniqueValues
        .filter(v => typeof v === 'string' || typeof v === 'number' || typeof v === 'symbol')
        .map(value => [
          value,
          {
            value,
            writable: false,
            enumerable: true,
          },
        ]),
      ),
    });

    Object.freeze(this);
  }

  /**
   * Retrieves the number of elements in the `values` array.
   *
   * @return {number} The length of the `values` array.
   */
  get length() {
    return this.values.length;
  }

  /**
   * Retrieves the first element from the `values` array.
   * If the array is empty, returns `null`.
   *
   * @return {*} The first element of the `values` array, or `null` if the array is empty.
   */
  get first() {
    return this.values[0] ?? null;
  }

  /**
   * Retrieves the last element from the `values` array.
   * If the array is empty, it returns `null`.
   *
   * @return {*} The last element of the `values` array, or `null` if the array is empty.
   */
  get last() {
    return this.values[this.values.length - 1] ?? null;
  }

  /**
   * Returns the default iterator for the object.
   *
   * The iterator allows iteration over the `values` property of the object.
   *
   * @return {Iterator} An iterator for the values held by this object.
   */
  [Symbol.iterator]() {
    return this.values[Symbol.iterator]();
  }

  /**
   * Retrieves the next value in the sequence from the list of values.
   *
   * @param {any} currentValue - The current value to find in the list.
   * @return {any|null} The next value in the list if it exists, or null if the current value is the last one or not found.
   */
  next(currentValue) {
    const index = this.values.indexOf(currentValue);
    if (index === -1 || index === this.values.length - 1) {
      return null;
    }
    return this.values[index + 1];
  }

  /**
   * Retrieves the previous value in the `values` array relative to the given current value.
   *
   * @param {any} currentValue - The current value to find the previous value for in the `values` array.
   * @return {any|null} The previous value in the array if it exists, otherwise null.
   */
  previous(currentValue) {
    const index = this.values.indexOf(currentValue);
    if (index <= 0) {
      return null;
    }
    return this.values[index - 1];
  }

  /**
   * Compares the positions of two values within the `values` array and determines their relative difference.
   *
   * @param {any} firstValue - The first value to locate and compare within the `values` array.
   * @param {any} secondValue - The second value to locate and compare within the `values` array.
   * @return {number|null} Returns the difference in indices between `firstValue` and `secondValue` if both exist in the `values` array. Returns `null` if either value is not found.
   */
  compare(firstValue, secondValue) {
    const index1 = this.values.indexOf(firstValue);
    const index2 = this.values.indexOf(secondValue);
    if (index1 === -1 || index2 === -1) {
      return null;
    }
    return index1 - index2;
  }

  /**
   * Retrieves the value at the specified index from the values array.
   *
   * @param {number} index - The index of the value to retrieve.
   * @return {*} The value at the specified index, or null if the index is out of bounds.
   */
  getByIndex(index) {
    return this.values[index] ?? null;
  }

  /**
   * Checks if a specified value exists in the collection.
   *
   * @param {any} value - The value to check for existence.
   * @return {boolean} Returns true if the value exists in the collection, otherwise false.
   */
  has(value) {
    return this.values.includes(value);
  }

  /**
   * Returns the index out of the first occurrence of the specified value in the array, or -1 if it is not present.
   *
   * @param {*} value - The value to locate in the array.
   * @return {number} The index of the specified value, or -1 if the value is not found.
   */
  indexOf(value) {
    return this.values.indexOf(value);
  }

  /**
   * Converts the current instance into its string representation.
   * The method formats the values by checking their types and returns
   * the values in readable form.
   *
   * @return {string} A string representation of the instance, formatted as an enumeration.
   */
  toString() {
    const formatted = this.values.map(v => {
      if (typeof v === 'string') {
        return `"${v}"`;
      }
      if (typeof v === 'number' || typeof v === 'boolean') {
        return `${v}`;
      }
      return String(v);
    });
    return `Enum(${formatted.join(', ')})`;
  }

  /**
   * Checks if the provided value is the first element in the values array.
   *
   * @param {any} value - The value to be compared with the first element of the array.
   * @return {boolean} Returns true if the provided value is the first element; otherwise, returns false.
   */
  isFirst(value) {
    return this.values[0] === value;
  }

  /**
   * Checks if the provided value is the last element in the array values array.
   *
   * @param {*} value - The value to check against the last element of the array.
   * @return {boolean} Returns true if the provided value is the last element of the array, otherwise false.
   */
  isLast(value) {
    return this.values[this.values.length - 1] === value;
  }

  /**
   * Retrieves a random element from the array of values.
   * The method generates a random index based on the length of
   * @return {*} A random element from the array of values.
   */
  random() {
    const index = Math.floor(Math.random() * this.values.length);
    return this.values[index];
  }

  /**
   * Filters the values of the current instance based on a provided predicate function.
   *
   * @param {Function} predicate - A function that takes a single argument (an element from the current instance)
   * and returns a boolean indicating whether the element should be included in the filtered results.
   * @return {Enum} A new Enum instance containing only the values that satisfy the predicate function.
   */
  filter(predicate) {
    return new Enum(...this.values.filter(predicate));
  }

  /**
   * Checks if at least one element in the array satisfies the provided testing function.
   *
   * @param {Function} predicate - A function to test each element of the array. It should return a boolean value.
   * @return {boolean} Returns true if the callback function returns a truthy value for at least one element in the array; otherwise, false.
   */
  some(predicate) {
    return this.values.some(predicate);
  }

  /**
   * Evaluates whether all elements in the `values` array satisfy the provided predicate function.
   *
   * @param {Function} predicate - A function that takes an element of the array as an argument
   * and returns a boolean indicating whether the element satisfies the condition.
   * @return {boolean} - Returns `true` if all elements in the `values` array satisfy the predicate, otherwise `false`.
   */
  every(predicate) {
    return this.values.every(predicate);
  }

  /**
   * Applies a callback function to each element in the `values` array and returns a new array with the results.
   *
   * @param {Function} callback - The function to execute on each element in the array. It receives the current element as its argument.
   * @return {Array} A new array containing the results of applying the callback function to each element in the original array.
   */
  map(callback) {
    return this.values.map(callback);
  }

  /**
   * Reduces the array to a single value using a provided callback function.
   *
   * @param {Function} callback - A function that is executed on each element of the array. It takes four arguments:
   *   accumulator (the accumulated value previously returned), currentValue (the current element being processed),
   *   currentIndex (the index of the current element), and array (the array reduce was called upon).
   * @param {*} initialValue - The initial value to start the reduction. If not provided, the first element of the array is used.
   * @return {*} The single value that results from reducing the array.
   */
  reduce(callback, initialValue) {
    return this.values.reduce(callback, initialValue);
  }

  /**
   * Iterates over each element in the collection and executes the provided callback function.
   *
   * @param {Function} callback - A function to execute for each element in the collection.
   * The callback is called with the current element as its argument.
   * @return {void} No return value. The method performs operations for side effects only.
   */
  forEach(callback) {
    this.values.forEach(callback);
  }

  /**
   * Creates a new instance of the Enum class with the provided arguments.
   *
   * @param {...*} args - The arguments to initialize the Enum instance.
   * @return {Enum} A new Enum instance.
   */
  static of(...args) {
    return new Enum(...args);
  }
}
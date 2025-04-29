/**
 * A utility class to create and manage enumerable types.
 * Provides methods to manage and interact with a set of predefined enumerable values.
 */
export default class Enum {
  constructor(...args) {
    this.values = args;
    args.forEach((arg) => {
      this[arg] = arg;
    });
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
    if (index === -1 || index === this.values.length - 1) return null;
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
    if (index <= 0) return null;
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
    if (index1 === -1 || index2 === -1) return null;
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
   * Converts the enumeration instance to a string representation.
   *
   * @return {string} A string describing the enumeration, listing its values separated by commas.
   */
  toString() {
    return `Enum(${this.values.join(', ')})`;
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
   * Checks if the provided value is the last element in the array `this.values`.
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
}
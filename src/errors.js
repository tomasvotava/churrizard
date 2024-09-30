/**
 * @module errors
 */

export class NotImplementedError extends Error {
  /**
   * @param {string} name The unimplemented object name
   */
  constructor(name) {
    super(`${name} is not implemented.`);
    this.name = name;
  }
}

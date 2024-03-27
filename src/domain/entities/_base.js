/**
 * @module entities
 */

const crypto = require("crypto");

export const toPlainObject = (object) => {
  if (object === null || object === undefined) {
    return null;
  }
  if (Array.isArray(object)) {
    return object.map(toPlainObject);
  }

  if (object instanceof Date) return object;

  if (typeof object === "object") {
    const plainObject = {};
    for (const [key, value] of Object.entries(object)) {
      plainObject[key] = toPlainObject(value);
    }
    return plainObject;
  }
  return object;
};

export class BaseModel {
  /** @type {string} */
  static collectionName = "";

  /**
   * Createa a random UID (UUID4)
   * @returns {string} random uid
   */
  static createUid() {
    return crypto.randomUUID();
  }

  /**
   * @param {string?} uid Unique identifier for the model
   */
  constructor(uid) {
    this.uid = uid || BaseModel.createUid();
  }

  toPlainObject() {
    return toPlainObject(this);
  }
}

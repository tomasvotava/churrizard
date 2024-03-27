/**
 * @module entities
 */

import { BaseModel } from "./_base.js";

export class Address {
  /**
   * @param {object} options Address options
   * @param {string!} options.firstName First name of the recipient
   * @param {string!} options.lastName Last name of the recipient
   * @param {string!} options.street Street address
   * @param {string!} options.city City
   * @param {string!} options.state State
   * @param {string!} options.zip ZIP code
   * @param {string!} options.country Country
   */
  constructor({ firstName, lastName, street, city, state, zip, country }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.country = country;
  }
}

export class User extends BaseModel {
  static collectionName = "users";

  /**
   * @param {object} options User options
   * @param {string?} options.uid Unique identifier for the model
   * @param {string!} options.email Email of the user
   * @param {string!} options.firstName First name of the user
   * @param {string!} options.lastName Last name of the user
   * @param {Address[] | object[]} options.addresses Addresses of the user
   */
  constructor({ uid = null, email, firstName, lastName, addresses = [] }) {
    super(uid);
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.addresses = addresses.map((address) =>
      address instanceof Address ? address : new Address(address),
    );
  }
}

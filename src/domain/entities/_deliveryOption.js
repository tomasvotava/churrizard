/**
 * @module entities
 */

import { BaseModel } from "./_base";

export const DeliveryOptionType = Object.freeze({
  PICKUP: "pickup",
  DELIVERY: "delivery",
});

export class DeliveryOption extends BaseModel {
  static collectionName = "deliveryOptions";

  /**
   * @param {object} options Delivery option options
   * @param {string?} options.uid Unique identifier for the model
   * @param {string!} options.name Name of the delivery option
   * @param {DeliveryOptionType!} options.type Type of delivery option
   * @param {number?} options.price Price for the delivery option
   * @param {number?} options.maxItems Maximum number of items for the delivery option
   * @param {number?} options.maxDistance Maximum distance for the delivery option
   * @param {number?} options.maxWeight Maximum weight for the delivery option
   */
  constructor({
    uid = null,
    name,
    type,
    price = 0,
    maxItems = null,
    maxDistance = null,
    maxWeight = null,
  }) {
    super(uid);
    this.name = name;
    this.type = type;
    this.price = price;
    this.maxItems = maxItems;
    this.maxDistance = maxDistance;
    this.maxWeight = maxWeight;
  }
}

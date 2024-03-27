/**
 * @module entities
 */

import { BaseModel } from "./_base.js";
import { Product, ProductVariant } from "./_product.js";

export const OrderStatus = Object.freeze({
  NEW: "new",
  IN_PROGRESS: "in_progress",
  READY: "ready",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
});

export class OrderItem {
  /**
   * @param {object} options Order item options
   * @param {string} options.productUid Product UID
   * @param {string?} options.variantUid Variant UID
   * @param {number} options.quantity Quantity of the product
   * @param {number} options.pricePerUnit Price per unit
   */
  constructor({ productUid, variantUid = null, quantity = 1, pricePerUnit }) {
    this.productUid = productUid;
    this.variantUid = variantUid;
    this.quantity = quantity;
    this.pricePerUnit = pricePerUnit;
  }

  /**
   * @param {Product | ProductVariant} product Product or product variant
   * @param {number} quantity Quantity of the product
   * @returns {OrderItem} Order item
   */
  static fromProduct(product, quantity) {
    if (product instanceof ProductVariant && !product.productUid) {
      throw new Error("Product variant must have productUid");
    }
    if (product.regularPrice === null || product.regularPrice === undefined) {
      throw new Error("Product variant must have regularPrice");
    }
    return new OrderItem({
      productUid: product.uid,
      variantUid: product.variantUid || null,
      quantity,
      pricePerUnit: product.regularPrice,
    });
  }
}

/**
 * @param {OrderItem | Product | ProductVariant | object} item Item to convert
 * @returns {OrderItem} Converted order item
 */
const convertItem = (item) => {
  if (item instanceof OrderItem) {
    return item;
  }
  if (item instanceof ProductVariant) {
    return OrderItem.fromProduct(item, 1);
  }
  if (item instanceof Product) {
    return OrderItem.fromProduct(item, 1);
  }
  return new OrderItem(item);
};

export class Order extends BaseModel {
  static collectionName = "orders";

  /**
   * @param {object} options Order options
   * @param {string?} options.uid Unique identifier for the model
   * @param {Date?} options.created Date the order was created
   * @param {OrderStatus?} options.status Order status
   * @param {import('./_deliveryOption.js').DeliveryOption!} options.deliveryOption Delivery option
   * @param {OrderItem[] | Product[] | ProductVariant[]} options.items Order items
   */
  constructor({
    uid = null,
    created = null,
    status = OrderStatus.NEW,
    deliveryOption,
    items = [],
  }) {
    super(uid);
    this.created = created || new Date();
    this.status = status;
    this.deliveryOption = deliveryOption;
    this.items = items.map(convertItem);
  }
}

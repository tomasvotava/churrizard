/**
 * @module entities
 */

const crypto = require("crypto");
import { BaseModel } from "./_base";

export class ProductProperties {
  /**
   *
   * @param {object} options Product properties
   * @param {number?} options.width Width of the product
   * @param {number?} options.height Height of the product
   * @param {number?} options.depth Depth of the product
   * @param {number?} options.weight Weight of the product
   * @param {object} options.custom Custom properties
   */
  constructor({
    width = null,
    height = null,
    depth = null,
    weight = null,
    custom = {},
  }) {
    this.width = width || null;
    this.height = height || null;
    this.depth = depth || null;
    this.weight = weight || null;
    this.custom = custom || {};
  }
}

export class ProductVariant {
  /**
   * @class ProductVariant
   * @description All properties not specified are inherited from the parent product
   * @param {object} options Product variant options
   * @param {string?} options.title Title of the product variant
   * @param {number?} options.stock Stock of the product variant
   * @param {number?} options.regularPrice Regular price of the product variant
   * @param {number?} options.actionPrice Action price of the product variant
   * @param {string[]} options.images Images of the product variant
   * @param {ProductProperties} options.properties Properties of the product variant
   * @param {boolean} options.published Whether the product variant is published
   * @param {string?} options.shortDescription Short description of the product variant
   * @param {string?} options.description Description of the product variant
   * @param {string?} options.productUid UID of the parent product
   * @param {string?} options.variantUid UID of the product variant
   */
  constructor({
    title = null,
    stock = null,
    regularPrice = null,
    actionPrice = null,
    images = [],
    properties = new ProductProperties({}),
    published = true,
    shortDescription = null,
    description = null,
    productUid = null,
    variantUid = null,
  }) {
    this.title = title;
    this.stock = stock;
    this.regularPrice = regularPrice;
    this.actionPrice = actionPrice;
    this.images = images;
    this.properties =
      properties instanceof ProductProperties
        ? properties
        : new ProductProperties(properties);
    this.published = published;
    this.shortDescription = shortDescription;
    this.description = description;
    this.productUid = productUid;
    this.variantUid = variantUid || crypto.randomUUID();
  }
}

export class Product extends BaseModel {
  static collectionName = "products";
  /**
   * @param {object} options Product options
   * @param {string?} options.uid Unique identifier for the model
   * @param {string!} options.catalogNumber Catalog number of the product
   * @param {string!} options.title Title of the product
   * @param {ProductVariant[]} options.variants Product variants
   * @param {boolean} options.published Whether the product is published
   * @param {boolean} options.highlighted Whether the product is highlighted
   * @param {boolean} options.visible Whether the product is visible in catalog
   * @param {string!} options.shortDescription Short description of the product
   * @param {string!} options.description Description of the product
   * @param {number} options.stock Stock of the product
   * @param {number} options.sortWeight Sort weight of the product
   * @param {number!} options.regularPrice Regular price of the product
   * @param {number?} options.actionPrice Action price of the product
   * @param {string!} options.categoryId Category ID
   * @param {string[]} options.tags Tags of the product
   * @param {string[]} options.images Images of the product
   * @param {ProductProperties} options.properties Properties of the product
   */
  constructor({
    uid = null,
    catalogNumber,
    title,
    variants = [],
    published = true,
    highlighted = false,
    visible = true,
    shortDescription,
    description,
    stock = -1,
    sortWeight = -1,
    regularPrice,
    actionPrice = null,
    categoryId,
    tags = [],
    images = [],
    properties = new ProductProperties({}),
  }) {
    super(uid);
    this.catalogNumber = catalogNumber;
    this.title = title;
    variants.forEach((variant) => {
      if (!variant.productUid) {
        variant.productUid = this.uid;
      } else if (variant.productUid !== this.uid) {
        throw new Error(
          `Product variant ${variant.variantUid} does not belong to product ${this.uid}`,
        );
      }
    });
    this.variants = variants.map((variant) =>
      variant instanceof ProductVariant ? variant : new ProductVariant(variant),
    );
    this.published = published;
    this.highlighted = highlighted;
    this.visible = visible;
    this.shortDescription = shortDescription;
    this.description = description;
    this.stock = stock;
    this.sortWeight = sortWeight;
    this.regularPrice = regularPrice;
    this.actionPrice = actionPrice;
    this.categoryId = categoryId;
    this.tags = tags;
    this.images = images;
    this.properties =
      properties instanceof ProductProperties
        ? properties
        : new ProductProperties(properties);
  }
}

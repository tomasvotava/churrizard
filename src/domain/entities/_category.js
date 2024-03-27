/**
 * @module entities
 */

import { BaseModel } from "./_base";

export class Category extends BaseModel {
  static collectionName = "categories";
  /**
   *
   * @param {object} options Category options
   * @param {string?} options.uid Unique identifier for the model
   * @param {string?} options.parentId Parent category ID
   * @param {number} options.sortWeight Sort weight for the category
   * @param {string?} options.image Image URL for the category
   * @param {string} options.title Title for the category
   */
  constructor({
    uid = null,
    title,
    parentId = null,
    sortWeight = 0,
    image = null,
  }) {
    super(uid);
    this.title = title;
    this.parentId = parentId;
    this.sortWeight = sortWeight;
    this.image = image;
  }
}

/**
 * @module entities
 */

import { BaseModel } from "./_base";

export class Post extends BaseModel {
  static collectionName = "posts";

  /**
   *
   * @param {object!} options Post options
   * @param {string?} options.uid Unique identifier for the model
   * @param {string!} options.title Title of the post
   * @param {string!} options.author Author of the post
   * @param {string!} options.content Content of the post
   * @param {Date?} options.created Date the post was created
   * @param {boolean} options.published Whether the post is published
   */
  constructor({
    uid = null,
    title,
    author,
    content,
    created = null,
    published = true,
  }) {
    super(uid);
    this.title = title;
    this.author = author;
    this.content = content;
    this.created = created || new Date();
    this.published = published;
  }
}

/**
 * @module repositories
 */

export class PostsRepository {
  /**
   * @param {import('../connectors/firestore').FirestoreConnector} connector Firestore connector
   */
  constructor(connector) {
    this.connector = connector;
  }

  static async findPostByTitle() {}
}

export class Churrizard {
  /**
   *
   * @param {object} options Churrizard application options
   * @param {import('./infrastructure/connectors/firestore').FirestoreConnector} options.connector Connector for the application
   */
  constructor({ connector }) {
    this.connector = connector;
  }
}

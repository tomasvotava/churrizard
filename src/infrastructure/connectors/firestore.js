/**
 * Firestore connector implementation.
 * @module connectors
 */

import { getApp } from "firebase/app";
import { getFirestore, collection, doc } from "firebase/firestore";

/**
 * @typedef {object} FirestoreConnectorOptions
 * @property {import('firebase/app').FirebaseApp?} app Firebase app (if not provided, will use the default app)
 */

/**
 * Configuration for Firestore connector
 * @class FirestoreConnectorConfig
 */
export class FirestoreConnectorConfig {
  /**
   * @param {FirestoreConnectorOptions?} options Options for the connector
   */
  constructor(options) {
    options = options || {};
    if (!options.app) {
      options.app = getApp();
    }
    this.options = options;
  }
}

/**
 * Firestore connector
 * @class FirestoreConnector
 */
export class FirestoreConnector {
  /**
   * @param {FirestoreConnectorConfig?} config Configuration for the connector
   */
  constructor(config) {
    config = config || new FirestoreConnectorConfig();
    this.config = config;
  }

  /**
   * Get the Firestore instance
   * @returns {import('firebase/firestore').Firestore} Firestore instance
   */
  get firestore() {
    return getFirestore(this.config.options.app);
  }

  /**
   * Get a collection reference
   * @param {string} path Path to the collection
   * @returns {import('firebase/firestore').CollectionReference} Collection reference
   */
  collection(path) {
    return collection(this.firestore, path);
  }

  /**
   * Get a document reference
   * @param {string} path Path to the document
   * @returns {import('firebase/firestore').DocumentReference} Document reference
   */
  doc(path) {
    return doc(this.firestore, path);
  }

  /**
   * Get a document by ID and return it as a model instance
   * @template {import('../../domain/entities/entities').BaseModel} T
   * @param {new() => T} model Model class
   * @param {string} uid  Document ID
   * @returns {Promise<T?>} Model instance or null if not found
   */
  async get(model, uid) {
    const docRef = this.doc(`${model.collectionName}/${uid}`);
    const docSnap = await docRef.get();
    if (docSnap.exists()) {
      return model.fromSnapshot(docSnap);
    }
    return null;
  }

  /**
   * Save a model instance to Firestore
   * @param {import('../../domain/entities/entities').BaseModel} model Model instance
   * @returns {Promise<void>} Promise that resolves when the model is saved
   */
  async save(model) {
    const docRef = this.doc(`${model.constructor.collectionName}/${model.uid}`);
    await docRef.set(model.toPlainObject());
  }
}

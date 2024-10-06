/**
 * @jest-environment ./test/firebase-environment.cjs
 */

import {
  FirestoreConnector,
  FirestoreConnectorConfig,
} from "../../../src/infrastructure/connectors/firestore";

describe("firestore connector", () => {
  const firestoreConnector = new FirestoreConnector(
    new FirestoreConnectorConfig({ firebaseOptions: global.firebaseOptions }),
  );
  test("returns firestore app", () => {
    expect(firestoreConnector.firestore).toBeTruthy();
    expect(firestoreConnector.firestore.app.name).toEqual("[DEFAULT]");
  });
});

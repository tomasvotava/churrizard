/**
 * @jest-environment ./test/firebase-environment.cjs
 */

describe("firebase emulators", () => {
  test("initialized", () => {
    expect(global).toBeDefined();
    expect(global.firebase_test_environment).toBeDefined();
    expect(global.firebase_test_environment.emulators.firestore).toBeDefined();
  });
});

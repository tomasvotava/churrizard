describe("firebase emulators", () => {
  test("initialized", () => {
    expect(global).toBeDefined();
    expect(global.FIREBASE_TEST_ENVIRONMENT).toBeDefined();
    expect(global.FIREBASE_TEST_ENVIRONMENT.emulators.firestore).toBeDefined();
  });
});

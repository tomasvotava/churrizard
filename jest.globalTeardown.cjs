module.exports = async () => {
  console.log("Clearing test environment.");
  await global.FIREBASE_TEST_ENVIRONMENT.cleanup();
};

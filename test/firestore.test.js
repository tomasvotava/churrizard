import { initializeTestEnvironment } from "@firebase/rules-unit-testing";

const EMULATORS_START_TIMEOUT = 10_000;
const EMULATORS_STOP_TIMEOUT = 5_000;

const startTestEnvironment = async () => {
  console.log("Initializing test environment.");
  global.__FIREBASE_TEST_ENVIRONMENT__ = await initializeTestEnvironment({
    projectId: "churrizard",
  });
};

const stopTestEnvironment = async () => {
  console.log("Clearing test environment.");
  await global.__FIREBASE_TEST_ENVIRONMENT__.cleanup();
};

beforeAll(startTestEnvironment, EMULATORS_START_TIMEOUT);
afterAll(stopTestEnvironment, EMULATORS_STOP_TIMEOUT);

describe("firestore module", () => {
  test("exports Churrizard class.", () => {
    const churrizardModule = require("../src/churrizard");
    expect(churrizardModule).toBeTruthy();
    expect(churrizardModule.Churrizard).toBeDefined();
    expect(churrizardModule.Churrizard).toEqual(expect.any(Function));
  });
});

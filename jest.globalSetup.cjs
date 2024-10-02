const { initializeTestEnvironment } = require("@firebase/rules-unit-testing");

/**@type {import('firebase/app').FirebaseOptions} */
const firebaseOptions = {
  projectId: "churrizard",
  apiKey: "test",
};

const testEmulatorHub = async ({ host, port }) => {
  try {
    const response = await fetch(`http://${host}:${port}`);
    if (response.status !== 200)
      throw new Error(`Emulator hub returned ${response.status} !== 200.`);
  } catch (error) {
    throw new Error(`Emulator hub is not running - ${error}`);
  }
};

module.exports = async () => {
  console.log("Initializing test environment.");
  let emulatorHub = undefined;
  if (!process.env.FIREBASE_EMULATOR_HUB) {
    console.warn(
      "FIREBASE_EMULATOR_HUB is not set, localhost:4400 is presumed.",
    );
    emulatorHub = { host: "localhost", port: 4400 };
  } else {
    const emulatorUrl = new URL(process.env.FIREBASE_EMULATOR_HUB);
    emulatorHub = { host: emulatorUrl.hostname, port: emulatorUrl.port };
  }
  testEmulatorHub(emulatorHub);
  console.log(
    `Emulator hub is running at ${emulatorHub.host}:${emulatorHub.port}`,
  );
  global.FIREBASE_TEST_ENVIRONMENT = await initializeTestEnvironment({
    projectId: firebaseOptions.projectId,
    hub: emulatorHub,
  });
  global.firebaseOptions = firebaseOptions;
};

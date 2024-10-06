const NodeEnvironment = require("jest-environment-node").TestEnvironment;
const { initializeTestEnvironment } = require("@firebase/rules-unit-testing");
/**@type {import('firebase/app').FirebaseOptions} */
const firebaseOptions = {
  projectId: "churrizard",
  apiKey: "test",
};

const testEmulatorHub = async ({ host, port }) => {
  try {
    const response = await fetch(`http://${host}:${port}/emulators`);
    if (response.status !== 200)
      throw new Error(`Emulator hub returned ${response.status} !== 200.`);
  } catch (error) {
    throw new Error(`Emulator hub is not running - ${error}`);
  }
};

class FirebaseEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    this.testPath = context.testPath;
    this.docblockPragmas = context.docblockPragmas;
  }

  async setup() {
    await super.setup();
    console.log("Initializing Firebase test environment.");
    let emulatorHub = undefined;
    if (!process.env.FIREBASE_EMULATOR_HUB) {
      console.warn(
        "FIREBASE_EMULATOR_HUB is not set, localhost:4400 is presumed.",
      );
      emulatorHub = { host: "localhost", port: 4400 };
    } else {
      const [host, port] = process.env.FIREBASE_EMULATOR_HUB.split(":");
      emulatorHub = { host, port };
    }
    try {
      await testEmulatorHub(emulatorHub);
    } catch (error) {
      console.error(error);
      throw error;
    }
    console.log(
      `Emulator hub is running at ${emulatorHub.host}:${emulatorHub.port}`,
    );
    this.global.firebase_test_environment = await initializeTestEnvironment({
      projectId: firebaseOptions.projectId,
      hub: emulatorHub,
    });
    this.global.firebaseOptions = firebaseOptions;
  }

  async teardown() {
    if (this.global.firebase_test_environment) {
      console.log("Running firebase environment teardown.");
      await this.global.firebase_test_environment.cleanup();
    } else {
      console.error(
        "Firebase environment teardown cannot proceed, did the setup go well?",
      );
      throw new Error("Firebase environment teardown failed.");
    }
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = FirebaseEnvironment;

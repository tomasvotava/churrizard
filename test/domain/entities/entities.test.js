import {
  User,
  Order,
  DeliveryOption,
  Category,
  Product,
  Post,
} from "../../../src/domain/entities/entities";

import {
  user,
  order,
  pickupOption,
  postOption,
  product,
  post,
  orderWithItems,
} from "./testdata";

const testClasses = [User, Order, DeliveryOption, Category, Product, Post];

const instances = [
  user,
  order,
  pickupOption,
  postOption,
  product,
  post,
  orderWithItems,
];

describe("models", () => {
  test.each(instances)(
    "instance of %p can be turned to plain object and back",
    (instance) => {
      const plainInstance = instance.toPlainObject();
      const newInstance = new instance.constructor(plainInstance);
      expect(newInstance).toEqual(instance);
    },
  );

  describe.each(testClasses)("base model subclass - %p", (testClass) => {
    test("has a collectionName", () => {
      expect(testClass.collectionName).toBeDefined();
      expect(testClass.collectionName).toMatch(/.+/);
      expect(testClass.collectionName.length).toBeGreaterThan(0);
    });
    test("has uid assigned if given", () => {
      const instance = new testClass({ uid: "uid" });
      expect(instance.uid).toBe("uid");
    });

    test("has a unique uid if not given", () => {
      const instance = new testClass({});
      expect(instance.uid).not.toBeNull();
      expect(instance.uid.length).toBe(36);
    });
  });
});

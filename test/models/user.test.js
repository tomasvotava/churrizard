import { User, Address } from "../../src/domain/entities/entities";

import { user, addressA } from "./testdata";

describe("user model", () => {
  test("can be converted to plain object", () => {
    const plainUser = user.toPlainObject();
    expect(Object.keys(plainUser)).toContain("uid");
    expect(Object.keys(plainUser)).toContain("addresses");
    expect(plainUser.addresses.length).toBe(2);
    expect(plainUser.addresses[0].firstName).toBe("John");
    expect(plainUser.addresses[0]).not.toBeInstanceOf(Address);
    expect(plainUser).not.toBeInstanceOf(User);
  });

  test("can be re-created from plain object", () => {
    const plainUser = user.toPlainObject();
    const newUser = new User(plainUser);
    expect(newUser).toBeInstanceOf(User);
    expect(newUser.addresses.length).toBe(2);
    expect(newUser.addresses[0]).toBeInstanceOf(Address);
    expect(newUser.addresses[0]).toEqual(addressA);
  });
});

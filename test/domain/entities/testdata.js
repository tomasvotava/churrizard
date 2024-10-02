import {
  User,
  Address,
  Order,
  DeliveryOption,
  DeliveryOptionType,
  Product,
  ProductVariant,
  ProductProperties,
  Post,
} from "../../../src/domain/entities/entities";

export const addressA = new Address({
  firstName: "John",
  lastName: "Denver",
  street: "123 Main St",
  city: "Denver",
  state: "CO",
  zip: "80202",
  country: "USA",
});

export const addressB = new Address({
  firstName: "Jane",
  lastName: "Doe",
  street: "456 Elm St",
  city: "Boulder",
  state: "CO",
  zip: "80301",
  country: "USA",
});

export const user = new User({
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  addresses: [addressA, addressB],
});

export const pickupOption = new DeliveryOption({
  name: "Pickup",
  fee: 0,
  type: DeliveryOptionType.PICKUP,
});
export const postOption = new DeliveryOption({
  name: "Post",
  fee: 5,
  type: DeliveryOptionType.DELIVERY,
});

export const order = new Order({
  created: new Date(2024, 0, 1),
  deliveryOption: pickupOption,
});

export const propertiesSmall = new ProductProperties({
  depth: 10,
  width: 20,
  height: 30,
  weight: 40,
});
export const propertiesLarge = new ProductProperties({
  depth: 20,
  width: 40,
  height: 60,
  weight: 80,
});
export const propertiesCustom = new ProductProperties({
  custom: { color: "red", material: "wood" },
});

export const productVariantSmall = new ProductVariant({
  title: "Small",
  stock: 10,
  regularPrice: 100,
  published: true,
  properties: propertiesSmall,
});
export const productVariantLarge = new ProductVariant({
  title: "Large",
  stock: 5,
  regularPrice: 200,
  published: true,
  properties: propertiesLarge,
});
export const productVariantCustom = new ProductVariant({
  title: "Custom",
  stock: 1,
  regularPrice: 500,
  published: true,
  properties: propertiesCustom,
});

export const productVariantUnset = new ProductVariant({
  published: false,
});

export const product = new Product({
  catalogNumber: "123",
  variants: [productVariantSmall, productVariantLarge, productVariantCustom],
  categoryId: "456",
  title: "Test Product",
  description: "Test Description",
  regularPrice: 100,
  shortDescription: "Test Short Description",
});

export const productWithUid = new Product({
  catalogNumber: "123",
  title: "Test Product",
  description: "Test Description",
  regularPrice: 100,
  shortDescription: "Test Short Description",
  uid: "uid",
});

export const post = new Post({
  title: "Test Post",
  author: "Test Author",
  content: "Test Content",
});

export const orderWithItems = new Order({
  deliveryOption: pickupOption,
  items: [productWithUid],
});

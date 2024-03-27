import {
  Order,
  OrderItem,
  OrderStatus,
  Product,
  ProductVariant,
} from "../../src/domain/entities/entities";

import {
  order,
  productWithUid,
  productVariantSmall,
  productVariantCustom,
  productVariantLarge,
} from "./testdata";

describe("order model", () => {
  test("has default status of 'new'", () => {
    expect(order.status).toBe(OrderStatus.NEW);
  });

  test("has default created date", () => {
    const order = new Order({});
    expect(order.created).toBeInstanceOf(Date);
  });

  test("can be created with items as products", () => {
    const order = new Order({
      items: [productWithUid],
    });
    expect(order.items[0]).toBeInstanceOf(OrderItem);
    expect(order.items[0].productUid).toBe(productWithUid.uid);
  });

  test("can be created with items as order items", () => {
    const orderItem = new OrderItem({
      productUid: productWithUid.uid,
      quantity: 2,
      pricePerUnit: productWithUid.regularPrice,
    });
    const order = new Order({
      items: [orderItem],
    });
    expect(order.items[0]).toBeInstanceOf(OrderItem);
    expect(order.items[0].productUid).toBe(productWithUid.uid);
  });

  test("can be created with items as product variants", () => {
    const order = new Order({
      items: [productVariantSmall, productVariantCustom, productVariantLarge],
    });
    expect(order.items[0]).toBeInstanceOf(OrderItem);
    expect(order.items[0].productUid).toBe(productVariantSmall.uid);
  });
});

describe("order item", () => {
  test("can be created from product", () => {
    const item = OrderItem.fromProduct(productWithUid, 2);
    expect(item.productUid).toBe(productWithUid.uid);
    expect(item.quantity).toBe(2);
    expect(item.pricePerUnit).toBe(productWithUid.regularPrice);
  });

  test("throws error if product has no price", () => {
    const productWithoutPrice = new Product({});
    const variantWithoutPrice = new ProductVariant({});
    expect(() => OrderItem.fromProduct(productWithoutPrice, 1)).toThrow();
    expect(() => OrderItem.fromProduct(variantWithoutPrice, 1)).toThrow();
  });
});

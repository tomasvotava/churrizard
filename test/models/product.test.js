import {
  Product,
  ProductVariant,
  ProductProperties,
} from "../../src/domain/entities/entities";

import {
  product,
  productVariantSmall,
  productVariantCustom,
  productVariantUnset,
  propertiesSmall,
} from "./testdata";

describe("product model", () => {
  describe("product properties", () => {
    test("dimensions default to null", () => {
      const properties = new ProductProperties({});
      expect(properties.depth).toBeNull();
      expect(properties.width).toBeNull();
      expect(properties.height).toBeNull();
      expect(properties.weight).toBeNull();
      expect(properties.custom).toEqual({});
    });

    test("product variant's properties", () => {
      expect(productVariantSmall.title).toBe("Small");
      expect(productVariantSmall.stock).toBe(10);
      expect(productVariantSmall.regularPrice).toBe(100);
      expect(productVariantSmall.published).toBe(true);
      expect(productVariantSmall.properties).toEqual(propertiesSmall);

      expect(productVariantSmall.properties.custom).toEqual({});
      expect(productVariantCustom.properties.custom).toEqual({
        color: "red",
        material: "wood",
      });
    });

    test("product variant's default", () => {
      expect(productVariantUnset.title).toBeNull();
      expect(productVariantUnset.stock).toBeNull();
      expect(productVariantUnset.regularPrice).toBeNull();
      expect(productVariantUnset.published).toBe(false);
      expect(productVariantUnset.properties).toEqual(new ProductProperties({}));
      expect(productVariantUnset.images).toEqual([]);
      expect(productVariantUnset.shortDescription).toBeNull();
      expect(productVariantUnset.description).toBeNull();
    });

    test("products cannot steal variants", () => {
      const whiteShirt = new ProductVariant({ title: "White" });
      new Product({ title: "shirt", variants: [whiteShirt] });
      expect(() => new Product({ variants: [whiteShirt] })).toThrow();
    });

    describe("reconstructed properties match original", () => {
      const plainProduct = product.toPlainObject();
      test.each(plainProduct.variants)("variant %p", (variant) => {
        expect(variant).not.toBeInstanceOf(ProductVariant);
        expect(variant.properties).not.toBeInstanceOf(ProductProperties);
        expect(variant.properties).toEqual(
          plainProduct.variants.find((v) => v.title === variant.title)
            .properties,
        );
      });
      const reconstructedProduct = new Product(plainProduct);
      test.each(reconstructedProduct.variants)("variant %p", (variant) => {
        expect(variant).toBeInstanceOf(ProductVariant);
        expect(variant.properties).toBeInstanceOf(ProductProperties);
        expect(variant.properties).toEqual(
          product.variants.find((v) => v.title === variant.title).properties,
        );
      });
    });
  });
});

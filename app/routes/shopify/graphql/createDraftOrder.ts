import { getGraphqlClient } from "./getGraphqlClient";

export async function createDraftOrder(shop: string) {
  const graphQlClient = await getGraphqlClient(shop);

  await graphQlClient.request(
    `mutation draftOrderCreate($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
        }
      }
    }`,
    {
      variables: {
        input: {
          // customerId: "gid://shopify/Customer/544365967",
          note: "Test draft order",
          email: "test.user@shopify.com",
          taxExempt: true,
          tags: "foo",
          shippingLine: {
            title: "Custom Shipping",
            price: 4.55,
          },
          shippingAddress: {
            address1: "123 Main St",
            city: "Waterloo",
            zip: "A1A 1A1",
            countryCode: "DE",
          },
          billingAddress: {
            address1: "456 Main St",
            city: "Toronto",
            zip: "Z9Z 9Z9",
            countryCode: "DE",
          },
          // appliedDiscount: {
          //   description: "damaged",
          //   value: 5.0,
          //   amount: 5.0,
          //   valueType: "FIXED_AMOUNT",
          //   title: "Custom",
          // },
          lineItems: [
            // {
            //   title: "Custom product",
            //   originalUnitPrice: 14.99,
            //   quantity: 5,
            //   appliedDiscount: {
            //     description: "wholesale",
            //     value: 5.0,
            //     amount: 3.74,
            //     valueType: "PERCENTAGE",
            //     title: "Fancy",
            //   },
            //   weight: {
            //     value: 1,
            //     unit: "KILOGRAMS",
            //   },
            //   customAttributes: [
            //     { key: "color", value: "Gold" },
            //     { key: "material", value: "Plastic" },
            //   ],
            // },
            {
              variantId: "gid://shopify/ProductVariant/47831615996224",
              quantity: 1,
            },
          ],
          // customAttributes: [
          //   { key: "name", value: "Achilles" },
          //   { key: "city", value: "Troy" },
          // ],
        },
      },
    },
  );
}

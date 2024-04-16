import { getGraphqlClient } from "./getGraphqlClient";

interface Address {
  address1: string;
  city: string;
  zip: string;
  countryCode: string;
}

interface ShippingLine {
  title: string;
  price: number;
}

interface CustomAttribute {
  key: string;
  value: string;
}

interface LineItem {
  variantId: string;
  quantity: number;
}

export interface DraftOrderInput {
  customerId?: string;
  note: string;
  email: string;
  phone?: string;
  taxExempt?: boolean;
  tags?: string;
  visibleToCustomer?: boolean;
  shippingLine?: ShippingLine;
  shippingAddress?: Address;
  billingAddress: Address;
  customAttributes: CustomAttribute[];
  lineItems: LineItem[];
}

export async function createDraftOrder(shop: string, input: DraftOrderInput) {
  const graphQlClient = await getGraphqlClient(shop);

  console.log("inside createDraftOrder - input: ", input);
  console.log("graphQlClient session.shop", graphQlClient.session.shop);
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
          note: input.note,
          email: input.email,
          taxExempt: true,
          tags: "Albis Leasing",
          customAttributes: [
            { key: "name", value: input.customAttributes[0].value },
          ],
          shippingAddress: {
            address1: input.shippingAddress?.address1,
            city: input.shippingAddress?.city,
            zip: input.shippingAddress?.zip,
            countryCode: "DE",
          },
          billingAddress: {
            address1: "456 Main St",
            city: "Toronto",
            zip: "Z9Z 9Z9",
            countryCode: "DE",
          },
          lineItems: [
            {
              variantId: "gid://shopify/ProductVariant/47831615996224",
              quantity: 1,
            },
            {
              variantId: `${input.lineItems[0].variantId}`,
              quantity: input.lineItems[0].quantity,
            },
          ],
        },
      },
    },
  );
}

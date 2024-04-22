import { appendUniqueNote } from "~/routes/utils/formatData";
import { getGraphqlClient } from "./getGraphqlClient";

type OrderData = {
  data: {
    order: {
      id: string;
      note?: string | null;
    };
  };
};

export async function addNoteToOrder(
  shop: string,
  orderId: string,
  newNote: string,
) {
  const graphQlClient = await getGraphqlClient(shop);

  const fetchResult = await graphQlClient.request(
    `query getOrder($id: ID!) {
    order(id: $id) {
      id
      note
    }
  }`,
    {
      variables: {
        id: `${orderId}`,
      },
    },
  );

  const {
    data: { order },
  } = fetchResult as unknown as OrderData;

  console.log("data of order ", order);
  const note = appendUniqueNote(order.note ?? "", newNote);
  console.log("new notes ", order);

  await graphQlClient.request(
    `mutation orderUpdate($input: OrderInput!) {
    orderUpdate(input: $input) {
      order {
        id
        note
      }
      userErrors {
        field
        message
      }
    }
  }`,
    {
      variables: {
        input: {
          id: `${orderId}`,
          note,
        },
      },
    },
  );
}

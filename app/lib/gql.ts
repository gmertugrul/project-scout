import { DocumentNode, print } from "graphql";
import { getSdk } from "./gql-sdk";

type RequesterOptions = {};

export function getGQL() {
  // @ts-ignore
  const requester: Requester<RequesterOptions> = async <
    R,
    V extends Record<string, any>
  >(
    doc: DocumentNode,
    variables: V,
    options: RequesterOptions = {}
  ): Promise<R> => {
    const definition = doc.definitions[0];

    if (definition?.kind !== "OperationDefinition") {
      throw new Error(
        "DocumentNode passed to Apollo Client must contain single query or mutation"
      );
    }

    const response = await fetch(`${process.env.NEXT_STRAPI_URL}/graphql`, {
      method: "POST",
      body: JSON.stringify({
        query: print(doc),
        variables,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_GQL_ACCESS_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Unable to execute API request. Received status code ${response.status}`
      );
    }

    const body = await response.json();

    if (body.errors) throw new Error(body.errors);

    if (body.data === undefined || body.data === null)
      throw new Error("No data presented in the GraphQL response");

    return body.data;
  };

  return getSdk(requester);
}

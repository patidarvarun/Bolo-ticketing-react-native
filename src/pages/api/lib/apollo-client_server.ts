import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_TICKETS_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const userData: any = localStorage.getItem("userData");
  const userParse: any = userData && JSON.parse(userData);

  return {
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: userParse ? `Bearer ${userParse.api_token}` : "",
    },
  };
});

const client_server = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client_server;

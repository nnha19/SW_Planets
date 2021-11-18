import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_BACK4APP_URL,
  headers: {
    "X-Parse-Application-Id": process.env.REACT_APP_APPLICATION_ID,
    "X-Parse-Client-Key": process.env.REACT_APP_CLIENT_KEY,
  },
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
});

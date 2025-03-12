import { ApolloClient, InMemoryCache, HttpLink, concat } from "@apollo/client";
export { gql } from "./__codegen__/gql";
import { setContext } from "@apollo/client/link/context";

// Create an HttpLink instance
const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GITHUB_GQL_ENDPOINT,
});

// Create an authLink using setContext
const authLink = setContext((_, { headers }) => {
    const token = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
    return {
        headers: {
            ...headers,
            'Authorization': token ? `Bearer ${token}` : "",
            'X-Github-Next-Global-ID': '1'
        },
    };
});

// Combine authLink and httpLink using concat
export const githubApolloClient = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache(),
}); 
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import DataEntry from "./pages/DataEntry";
import Settings from "./pages/Settings";
import { FarmProvider } from "./utils/GlobalState";
import { Flex, CSSReset, ChakraProvider } from "@chakra-ui/react";
import Analytics from "./pages/Analytics";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <FarmProvider>
          <ChakraProvider>
            <Flex direction="column" align="center" justify="center">
              <CSSReset />
              <Flex
                justify="center"
                align="center"
                w="100vw"
                h="100vh"
                bgGradient={["linear(to-r, yellow.100, yellow.200)"]}
              >
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/overview" component={Overview} />
                  <Route exact path="/dataentry" component={DataEntry} />
                  <Route exact path="/settings" component={Settings} />
                  <Route exact path="/analytics" component={Analytics} />
                </Switch>
              </Flex>
            </Flex>
          </ChakraProvider>
        </FarmProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;

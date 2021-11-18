import React from "react";
import PlanetsPage from "./pages/planetsPage";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient/client";

import "./App.css";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <PlanetsPage />
      </div>
    </ApolloProvider>
  );
};

export default App;

import React from "react";
import { BrowserRouter } from "react-router"; // Use react-router-dom here
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainApp from "./MainApp";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

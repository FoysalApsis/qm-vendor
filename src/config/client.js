import { QueryClient } from "react-query";

// Create a client
const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default client;

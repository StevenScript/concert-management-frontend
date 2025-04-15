import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Helper function to perform an Axios GET request.
const fetchData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

// Custom hook with the "object syntax" introduced in React Query v5.
const useFetchData = (url, options = {}) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => fetchData(url),
    ...options,
  });
};

export default useFetchData;

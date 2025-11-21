import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { serverUrl } from "../App";

export const allFoodItems = () => {
  return useQuery({
    queryKey: ["allFoods"],
    queryFn: async () => {
      const { data } = await axios.get(`${serverUrl}/api/public/get-all-items`);
      return data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false, // Don't refetch on tab switch
  });
};

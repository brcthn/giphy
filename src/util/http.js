import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();

export async function fetchEvents({ pageParam = 0 }) {
  console.log("pageParam" + pageParam);
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
  const limit = 10;
  const offset = pageParam * limit;
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${offset}`;

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const jsonData = await response.json();

  const events = await jsonData.data;
  const pagination = await jsonData.pagination;

  return { events, pagination };
}

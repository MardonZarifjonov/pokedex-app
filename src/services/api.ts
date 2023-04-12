import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const baseApi = createApi({
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
});

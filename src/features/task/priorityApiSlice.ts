import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Priority } from "src/data/models/TaskModel";

export const priorityApi = createApi({
  reducerPath: "priorityApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: builder => ({
    getPriorities: builder.query<Priority[], string>({
      query: () => `/priorities`,
    }),
  }),
});

export const { useGetPrioritiesQuery } = priorityApi;

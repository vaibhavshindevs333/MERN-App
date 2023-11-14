import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  reducerPath: "userApi",
  tagTypes: [
    "Register",
    "Login",
    "User",
    "Logout",
  ],
  endpoints: (build) => ({
    getRegister: build.query({
      query: (formData) => ({
        url: "/auth/register",
        method: "POST",
        body: formData,
      }),
      providesTags: ["Register"],
    }),
    getLogin: build.query({
      query: (values) => ({
        url: "/auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
       },
       body: values,
      }),
      providesTags: ["Login"],
    }),
    getUser: build.query({
      query: (id) => `/users/${id}`,
      providesTags: ["User"],
    }),
    getLogout: build.query({
      query: () => ('/users/logout'),
      providesTags: ["Logout"],
    }),
  }),
});

export const {
  useGetRegisterQuery,
  useGetLoginQuery,
  useGetUserQuery,
  useGetLogoutQuery,
} = api;

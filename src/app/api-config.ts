import { DefaultDataServiceConfig } from "@ngrx/data";

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: "http://localhost:8000/api/",
  timeout: 3000, // request timeout
};

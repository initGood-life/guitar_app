export interface SerializedError {
  data: {
    name?: string;
    message?: string;
    statusCode?: number;
    field?: string;
  };
  headers: Headers;
}

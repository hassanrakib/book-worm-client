type ErrorSources = {
  path: string | number;
  message: string;
}[];

// combination of both error response & success response
// as client side doesn't know about the response type
export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  // errorSources & stack will not be available when success response is sent
  errorSources?: ErrorSources;
  stack?: string | null;
  // similarly data will not be available when error response is sent
  data?: T;
}

export type QueryParams =
  | {
      searchTerm?: string;
      sort?: string;
      limit?: string;
      page?: string;
      fields?: string;
      [key: string]: unknown;
    }
  | undefined;

export interface ErrorComponentProps {
  error: Error & { digest?: string };
  reset: () => void;
}

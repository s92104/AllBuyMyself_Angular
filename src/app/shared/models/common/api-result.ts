export interface ApiResult<T> {
  isSuccess: boolean;
  result: T | null;
  errorMessage: string;
}

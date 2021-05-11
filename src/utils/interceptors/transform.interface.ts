export interface ResponseResult {
  success?: boolean;
  result: {
    message?: string;
    payload: any;
    [x: string]: any;
  } | null;
  error?: {
    code?: number;
    message?: string;
    [x: string]: any;
  } | null;
}

export interface CoreResponseResult {
  status?: boolean;
  statusCode?: number;
  data?: any;
  message?: string;
  setToken?: boolean;
  [x: string]: any;
}

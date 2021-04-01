export interface ResponseResult {
  success: boolean;
  result?: {
    message?: string;
    payload: any;
  } | null;
  error?: {
    code?: number;
    message?: string;
  } | null;
}

export interface CoreResponseResult {
  status?: boolean;
  statusCode?: number;
  data?: any;
  message?: string;
}

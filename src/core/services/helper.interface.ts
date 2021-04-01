export interface ResJsonReturn {
  success?: boolean;
  result: {
    message?: string;
    payload: any;
  } | null;
  error?: {
    code?: number;
    message?: string;
  } | null;
}

export interface ResJsonParam {
  successMsg?: string;
  payload?: any;
  errorMsg?: string;
}

export interface ConditionsQuery {
  name?: any;
}

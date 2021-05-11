export interface ResJsonReturn {
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

export interface ResJsonParam {
  message: string;
  payload: any;
  [x: string]: any;
}

export interface ConditionsQuery {
  name?: any;
}

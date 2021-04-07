export enum MessageTypeEnum {
  FIND_ALL = 'FIND_ALL',
  FIND_ONE = 'FIND_ONE',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum MessageEnum {
  SUCCESS = 'Success',
  FIND_ALL_SUCCESS = 'Get all success',
  FIND_ONE_SUCCESS = 'Get one success',
  CREATE_SUCCESS = 'Create success',
  UPDATE_SUCCESS = 'Update success',
  DELETE_SUCCESS = 'Delete success',

  FAILED = 'Failed',
  FIND_ALL_FAILED = 'Get all failed',
  FIND_ONE_FAILED = 'Get one failed',
  CREATE_FAILED = 'Create failed',
  UPDATE_FAILED = 'Update failed',
  DELETE_FAILED = 'Delete failed',
  DATA_NOT_FOUND = 'Data not found',
  UNKNOWN_ERROR = 'Unknown Error',

  SERVER_ERROR = 'Internal server error',
}

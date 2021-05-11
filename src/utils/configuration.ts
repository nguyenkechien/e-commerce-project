import { get } from 'env-var';

export const configuration = (): Record<string, any> => ({
  node: {
    env: get('NODE_ENV')
      .default('local')
      .required()
      .asString(),
    name: get('NODE_NAME')
      .default('blognest')
      .required()
      .asString(),
    url: get('NODE_URL')
      .default('http://localhost:3000')
      .asUrlString(),
    debug: get('NODE_ENV').asString() !== 'production',
    port: get('NODE_PORT')
      .default(3000)
      .required()
      .asPortNumber(),
  },
  mongooseConfig: {
    driver: get('DB_DRIVER')
      .default('mongodb')
      .required()
      .asString(),
    host: get('DB_HOST')
      .default('mongo')
      .required()
      .asString(),
    port: get('DB_PORT')
      .default(27017)
      .required()
      .asPortNumber(),
    name: get('DB_NAME')
      .default('blognest')
      .required()
      .asString(),
    user: get('DB_USER').asString(),
    pass: get('DB_PASS').asString(),
    auth: get('DB_AUTH').asString(),
  },
  jwt: {
    expiresIn: get('JWT_EXPIRES_IN')
      .default('60s')
      .required()
      .asString(),
    secret: get('JWT_SECRET')
      .default('secretKey')
      .required()
      .asString(),
  },
  cookie: {
    secret: get('COOKIE_SECRET')
      .default('secretKey')
      .required()
      .asString(),
    tokenKey: get('COOKIE_ACCESS_TOKEN_KEY')
      .default('x-access-token')
      .required()
      .asString(),
  },
});

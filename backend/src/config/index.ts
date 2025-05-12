import * as fs from 'fs';

const {
  PORT = 3000,
  PRIVATE_KEY = './src/auth/keys/jwtRS256.key',
  PUBLIC_KEY = './src/auth/keys/jwtRS256.key.pub',
  JWT_EXPIRATION = 60 * 60,
  AWS_ACCESS_KEY_ID = '',
  AWS_SECRET_ACCESS_KEY = '',
  AWS_DEFAULT_REGION = 'us-east-1',
  AWS_BUCKET = '',
  AWS_URL = '',
  AWS_ENDPOINT = '',
  AWS_USE_PATH_STYLE_ENDPOINT = 'true',
  IMAGE_DEFAULT_URL = 'https://your_bucket_name.s3.amazonaws.com/products/placeholder.svg',
} = process.env;

const pKey = fs.readFileSync(PRIVATE_KEY);
const pubKey = fs.readFileSync(PUBLIC_KEY);

export const config = {
  port: PORT,
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  },
  api: {
    prefix: '/api/v1',
    imageDefaultUrl: IMAGE_DEFAULT_URL,
  },
  auth: {
    privateKey: pKey,
    publicKey: pubKey,
    jwt: {
      expiresIn: Number(JWT_EXPIRATION),
    },
  },
  fileSystem: {
    s3: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: AWS_DEFAULT_REGION,
      bucket: AWS_BUCKET,
      url: AWS_URL,
      endpoint: AWS_ENDPOINT,
      usePathStyleEndpoint: AWS_USE_PATH_STYLE_ENDPOINT === 'true',
    },
  },
};

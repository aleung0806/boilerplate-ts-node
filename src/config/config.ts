import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });
const env = process.env
const testEnv = env.NODE_ENV === 'test'

export default {
  env: env.NODE_ENV,
  port: env.PORT, 
  mongoose: {
    url: testEnv 
      ? env.MONGODB_TEST_URL!
      : env.MONGODB_URL!
  },
  jwt: {
    secret: env.JWT_SECRET
  },
  redis: {
    url: env.REDIS_URL
  },
  session: {
    secret: env.SESSION_SECRET
  },
  email: {
    username: env.SMTP_USERNAME,
    password: env.SMTP_PASSWORD
  }

}
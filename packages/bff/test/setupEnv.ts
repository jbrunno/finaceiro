import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

jest.mock('@bff/logger');

const myEnv = dotenv.config({
  path: path.join(process.cwd(), '.env.dev'),
});
dotenvExpand.expand(myEnv);

import 'dotenv/config';

const { env } = process;

const { PORT } = env;
const { DB_HOST, DB_PASS, DB_CREDITS } = env;
const { EMAIL_USER } = env;
const { EMAIL_MAIN_URI } = env;
const { EMAIL_SECRET } = env;
const { COOKIE_SECRET, JWT_SECRET } = env;

export {
  COOKIE_SECRET, DB_CREDITS,
  DB_HOST, DB_PASS,
  EMAIL_MAIN_URI, EMAIL_SECRET,
  EMAIL_USER, JWT_SECRET, PORT,
};


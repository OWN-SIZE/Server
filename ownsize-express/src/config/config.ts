require("dotenv").config();

const db_url = process.env.DB_URL;
const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

const config = {
  dbURL: db_url,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID,
  GOOGLE_SECRET: GOOGLE_SECRET,
  GOOGLE_AUTH_URL: "https://accounts.google.com/o/oauth2/v2/auth",
  GOOGLE_AUTH_REDIRECT_URL: "http://localhost:8080/auth/loginCallback",
};

export default config;

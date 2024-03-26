import * as dotenv from "dotenv";

dotenv.config();

const config = {
  app: {
    name: process.env.NAME,
    host: process.env.HOST,
    port: process.env.PORT,
    url: process.env.URL || "http:/localhost:3000",
  },
  db: {
    mongoUrl: process.env.MONGO_URL,
  },
  email: {
    sender_email: process.env.SENDER_EMAIL,
    sender_email_pass: process.env.SENDER_EMAIL_PASS, //app password
    email_service: process.env.EMAIL_SERVICE,
    host: "smtp.gmail.com",
    port: 587,
  },
  jwt: {
    jwt_secrect: process.env.ACCESS_TOKEN_SECRECT,
  },
};

export default config;

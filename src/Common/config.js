import dotenv from "dotenv";

dotenv.config();

export const { SENDER_EMAIL, SENDER_PASS, OPENAI_API_KEY, PORT = 9000 } = process.env;

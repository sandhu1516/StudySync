import dotenv from "dotenv";
dotenv.config();

import { CohereClient } from "cohere-ai";

console.log("KEY EXISTS:", !!process.env.COHERE_API_KEY);
console.log("KEY STARTS WITH:", process.env.COHERE_API_KEY?.slice(0, 8));

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export default cohere;
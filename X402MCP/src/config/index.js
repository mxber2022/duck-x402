import { config } from "dotenv";

// Load environment variables
try {
  config();
} catch (error) {
  console.error("Failed to load environment variables:", error.message);
  process.exit(1);
}

export const serverConfig = {
  name: "x402 MCP Client Demo",
  version: "1.0.0",
};

export const paymentConfig = {
  privateKey: process.env.PRIVATE_KEY,
  baseURL: process.env.BASE_URL || "http://localhost:4000",
  endpointPath: process.env.ENDPOINT_PATH || "/pay",
};

// Validate required configuration
if (!paymentConfig.privateKey || !paymentConfig.baseURL || !paymentConfig.endpointPath) {
  console.error("Missing required configuration variables");
  console.error("Please ensure PRIVATE_KEY is set in your environment variables");
  throw new Error("Missing environment variables");
}

import axios from "axios";
import { privateKeyToAccount } from "viem/accounts";
import { withPaymentInterceptor } from "duck-x402-axios"; 
import { paymentConfig } from "../config/index.js";

export function createPaymentClient() {
  // Create a wallet client to handle payments
  let account;
  try {
    account = privateKeyToAccount(paymentConfig.privateKey);
    console.log("Wallet account created successfully");
  } catch (error) {
    console.error("Failed to create wallet account:", error.message);
    throw error;
  }

  // Create an axios client with payment interceptor using x402-axios
  let client;
  try {
    client = withPaymentInterceptor(axios.create({ baseURL: paymentConfig.baseURL }), account);
    console.log("Axios client with payment interceptor created successfully");
    return client;
  } catch (error) {
    console.error("Failed to create axios client:", error.message);
    throw error;
  }
}

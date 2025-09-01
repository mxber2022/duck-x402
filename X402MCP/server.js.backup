import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from "axios";
import { privateKeyToAccount } from "viem/accounts";
import { withPaymentInterceptor } from "x402-axios";
import { config } from "dotenv";
import { z } from "zod";

// Load environment variables and throw an error if any are missing
try {
  config();
} catch (error) {
  console.error("Failed to load environment variables:", error.message);
  process.exit(1);
}

const privateKey = process.env.PRIVATE_KEY;
const baseURL ="http://localhost:4021"; // e.g. https://example.com
const endpointPath ="/pay"; // e.g. /weather

if (!privateKey || !baseURL || !endpointPath) {
  console.error("Missing required configuration variables");
  console.error("Please ensure PRIVATE_KEY is set in your environment variables");
  throw new Error("Missing environment variables");
}

// Create a wallet client to handle payments
let account;
try {
  account = privateKeyToAccount(privateKey);
  console.log("Wallet account created successfully");
} catch (error) {
  console.error("Failed to create wallet account:", error.message);
  process.exit(1);
}

// Create an axios client with payment interceptor using x402-axios
let client;
try {
  client = withPaymentInterceptor(axios.create({ baseURL }), account);
  console.log("Axios client with payment interceptor created successfully");
} catch (error) {
  console.error("Failed to create axios client:", error.message);
  process.exit(1);
}

// Create an MCP server
let server;
try {
  server = new McpServer({
    name: "x402 MCP Client Demo",
    version: "1.0.0",
  });
  console.log("MCP server created successfully");
} catch (error) {
  console.error("Failed to create MCP server:", error.message);
  process.exit(1);
}

// Add an addition tool
try {
  server.tool(
    "get-data-from-resource-server",
    "Get data from the resource server (in this example, the weather)", //change this description to change when the client calls the tool
    {},
    async () => {
      try {
        console.log("Attempting to fetch data from resource server...");
        const res = await client.get(endpointPath);
        console.log("Successfully fetched data from resource server");
        return {
          content: [{ type: "text", text: JSON.stringify(res.data) }],
        };
      } catch (error) {
        console.error("Failed to fetch data from resource server:", error.message);
        throw new Error(`Failed to fetch data: ${error.message}`);
      }
    },
  );
  console.log("get-data-from-resource-server tool registered successfully");
} catch (error) {
  console.error("Failed to register get-data-from-resource-server tool:", error.message);
  process.exit(1);
}

try {
  server.registerTool("add",
    {
      title: "Addition Tool",
      description: "Add two numbers",
      inputSchema: { a: z.number(), b: z.number() }
    },
    async ({ a, b }) => {
      try {
        console.log(`Performing addition: ${a} + ${b}`);
        const result = a + b;
        console.log(`Addition result: ${result}`);
        return {
          content: [{ type: "text", text: String(result) }]
        };
      } catch (error) {
        console.error("Failed to perform addition:", error.message);
        throw new Error(`Failed to perform addition: ${error.message}`);
      }
    }
  );
  console.log("add tool registered successfully");
} catch (error) {
  console.error("Failed to register add tool:", error.message);
  process.exit(1);
}

// Add a payment tool for invoices
try {
  server.registerTool("pay-invoice",
    {
      title: "Pay Invoice",
      description: "Pay an invoice using the invoice ID",
      inputSchema: { invoiceId: z.string() }
    },
    async ({ invoiceId }) => {
      try {
        console.log(`Attempting to pay invoice: ${invoiceId}`);
        const res = await client.get(`/pay?invoiceId=${invoiceId}`);
        console.log("Successfully processed payment");
        return {
          content: [{ type: "text", text: JSON.stringify(res.data) }]
        };
      } catch (error) {
        console.error("Failed to pay invoice:", error.message);
        throw new Error(`Failed to pay invoice: ${error.message}`);
      }
    }
  );
  console.log("pay-invoice tool registered successfully");
} catch (error) {
  console.error("Failed to register pay-invoice tool:", error.message);
  process.exit(1);
}

// Connect to transport
try {
  console.log("Creating transport...");
  const transport = new StdioServerTransport();
  console.log("Connecting to transport...");
  await server.connect(transport);
  console.log("Successfully connected to transport");
} catch (error) {
  console.error("Failed to connect to transport:", error.message);
  process.exit(1);
}
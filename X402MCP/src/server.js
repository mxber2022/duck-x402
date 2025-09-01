import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { serverConfig } from "./config/index.js";
import { createPaymentClient } from "./utils/client.js";
import { registerTools } from "./utils/toolRegistry.js";

async function startServer() {
  try {
    // Create an MCP server
    let server;
    try {
      server = new McpServer(serverConfig);
      console.log("MCP server created successfully");
    } catch (error) {
      console.error("Failed to create MCP server:", error.message);
      process.exit(1);
    }

    // Create payment client
    let client;
    try {
      client = createPaymentClient();
    } catch (error) {
      console.error("Failed to create payment client:", error.message);
      process.exit(1);
    }

    // Register all tools
    try {
      registerTools(server, client);
    } catch (error) {
      console.error("Failed to register tools:", error.message);
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
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

// Start the server
startServer().catch(error => {
  console.error("Unhandled error during server startup:", error);
  process.exit(1);
});

export default startServer;

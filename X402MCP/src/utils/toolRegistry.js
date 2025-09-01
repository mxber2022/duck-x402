import { createPaymentTools } from "../tools/paymentTools.js";
import { createUtilityTools } from "../tools/utilityTools.js";
import { createInvoiceTools } from "../tools/invoiceTools.js";

export function registerTools(server, client) {
  const allTools = [
    ...createPaymentTools(client),
    ...createInvoiceTools(client),
    ...createUtilityTools()
  ];

  allTools.forEach(tool => {
    try {
      server.registerTool(tool.name, tool.schema, tool.handler);
      console.log(`${tool.name} tool registered successfully`);
    } catch (error) {
      console.error(`Failed to register ${tool.name} tool:`, error.message);
      throw error;
    }
  });

  console.log(`Successfully registered ${allTools.length} tools`);
}

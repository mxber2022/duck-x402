import { z } from "zod";
import { paymentConfig } from "../config/index.js";

export function createPaymentTools(client) {
  return [
    {
      name: "pay-invoice",
      schema: {
        title: "Pay Invoice",
        description: "Pay an invoice using the invoice ID",
        inputSchema: { invoiceId: z.string() }
      },
      handler: async ({ invoiceId }) => {
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
    },
    {
      name: "get-data-from-resource-server",
      schema: {
        title: "Get Data from Resource Server",
        description: "Get data from the resource server (can process payments with invoiceId parameter)",
        inputSchema: {
          type: "object",
          properties: {
            invoiceId: {
              type: "string",
              description: "Optional invoice ID for payment processing"
            }
          }
        }
      },
      handler: async (args) => {
        try {
          console.log("Attempting to fetch data from resource server...");
          let url = paymentConfig.endpointPath;
          if (args && args.invoiceId) {
            url = `${paymentConfig.endpointPath}?invoiceId=${args.invoiceId}`;
            console.log(`Processing payment for invoice: ${args.invoiceId}`);
          }
          const res = await client.get(url);
          console.log("Successfully fetched data from resource server");
          return {
            content: [{ type: "text", text: JSON.stringify(res.data) }],
          };
        } catch (error) {
          console.error("Failed to fetch data from resource server:", error.message);
          throw new Error(`Failed to fetch data: ${error.message}`);
        }
      }
    }
  ];
}

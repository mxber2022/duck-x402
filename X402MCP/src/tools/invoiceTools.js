import { z } from "zod";
import { paymentConfig } from "../config/index.js";

export function createInvoiceTools(client) {
  return [
    {
      name: "get-invoice-status",
      schema: {
        title: "Get Invoice Status",
        description: "Get the status and details of an invoice by ID",
        inputSchema: { 
          invoiceId: z.string().describe("The invoice ID to check status for")
        }
      },
      handler: async ({ invoiceId }) => {
        try {
          console.log(`Getting status for invoice: ${invoiceId}`);
          const res = await client.get(`/invoice/${invoiceId}`);
          console.log("Successfully retrieved invoice status");
          return {
            content: [{ type: "text", text: JSON.stringify(res.data, null, 2) }]
          };
        } catch (error) {
          console.error("Failed to get invoice status:", error.message);
          if (error.response?.status === 404) {
            throw new Error(`Invoice not found: ${invoiceId}`);
          }
          throw new Error(`Failed to get invoice status: ${error.message}`);
        }
      }
    },
    {
      name: "create-invoice",
      schema: {
        title: "Create Invoice",
        description: "Create a new invoice with amount and description",
        inputSchema: { 
          amount: z.string().describe("Invoice amount (e.g., '$10.50')"),
          description: z.string().describe("Description of the invoice")
        }
      },
      handler: async ({ amount, description }) => {
        try {
          console.log(`Creating invoice: ${amount} - ${description}`);
          const res = await client.post('/invoice', {
            amount,
            description
          });
          console.log("Successfully created invoice");
          return {
            content: [{ type: "text", text: JSON.stringify(res.data, null, 2) }]
          };
        } catch (error) {
          console.error("Failed to create invoice:", error.message);
          if (error.response?.status === 400) {
            throw new Error(`Invalid invoice data: ${error.response.data.error}`);
          }
          throw new Error(`Failed to create invoice: ${error.message}`);
        }
      }
    },
    {
      name: "list-invoices",
      schema: {
        title: "List All Invoices",
        description: "Get a list of all invoices in the system",
        inputSchema: {}
      },
      handler: async () => {
        try {
          console.log("Retrieving all invoices...");
          const res = await client.get('/invoice');
          console.log("Successfully retrieved invoice list");
          return {
            content: [{ type: "text", text: JSON.stringify(res.data, null, 2) }]
          };
        } catch (error) {
          console.error("Failed to list invoices:", error.message);
          throw new Error(`Failed to list invoices: ${error.message}`);
        }
      }
    },
    {
      name: "get-invoice-summary",
      schema: {
        title: "Get Invoice Summary",
        description: "Get a summary of invoice statistics (pending, paid, total)",
        inputSchema: {}
      },
      handler: async () => {
        try {
          console.log("Getting invoice summary...");
          const res = await client.get('/invoice/status/summary');
          console.log("Successfully retrieved invoice summary");
          return {
            content: [{ type: "text", text: JSON.stringify(res.data, null, 2) }]
          };
        } catch (error) {
          console.error("Failed to get invoice summary:", error.message);
          throw new Error(`Failed to get invoice summary: ${error.message}`);
        }
      }
    }
  ];
}

// Type definitions for the X402MCP server

/**
 * @typedef {Object} ServerConfig
 * @property {string} name - The name of the MCP server
 * @property {string} version - The version of the MCP server
 */

/**
 * @typedef {Object} PaymentConfig
 * @property {string} privateKey - The Ethereum private key for payments
 * @property {string} baseURL - The base URL for the payment server
 * @property {string} endpointPath - The endpoint path for payments
 */

/**
 * @typedef {Object} ToolDefinition
 * @property {string} name - The name of the tool
 * @property {Object} schema - The tool schema definition
 * @property {Function} handler - The tool handler function
 */

/**
 * @typedef {Object} PaymentResponse
 * @property {boolean} success - Whether the payment was successful
 * @property {string} message - Payment status message
 * @property {Object} invoice - Invoice details
 */

/**
 * @typedef {Object} Invoice
 * @property {string} id - Invoice ID
 * @property {string} amount - Invoice amount
 * @property {string} description - Invoice description
 * @property {string} status - Invoice status (pending, paid, expired, cancelled)
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} [paidAt] - Payment timestamp
 * @property {string} [paymentTxHash] - Payment transaction hash
 * @property {string} [paymentAmount] - Actual payment amount
 */

/**
 * @typedef {Object} InvoiceCreationRequest
 * @property {string} amount - Invoice amount (e.g., '$10.50')
 * @property {string} description - Invoice description
 */

/**
 * @typedef {Object} InvoiceCreationResponse
 * @property {Invoice} invoice - Created invoice
 * @property {string} paymentUrl - Payment URL for the invoice
 */

/**
 * @typedef {Object} InvoiceSummary
 * @property {number} pending - Number of pending invoices
 * @property {number} paid - Number of paid invoices
 * @property {number} total - Total number of invoices
 */

# X402MCP - Model Context Protocol Server for X402 Payments

A Model Context Protocol (MCP) server that enables AI assistants to interact with X402 payment systems for invoice processing and payments.

## Overview

X402MCP is an MCP server that provides AI assistants with the ability to:
- Process invoice payments using X402 protocol
- Fetch data from payment servers with automatic payment handling
- Perform basic mathematical operations
- Handle cryptocurrency wallet operations for payments

## Features

- **Payment Processing**: Pay invoices using X402 protocol with automatic payment interception
- **Resource Server Integration**: Fetch data from payment-protected endpoints
- **Wallet Integration**: Uses Viem for Ethereum wallet account management
- **Error Handling**: Comprehensive try-catch blocks with detailed logging
- **Environment Configuration**: Secure environment variable configuration

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Access to an X402-compatible payment server
- Ethereum private key for wallet operations

## Installation

1. Clone the repository and navigate to the X402MCP directory:
```bash
cd X402MCP
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root:
```env
PRIVATE_KEY=your_ethereum_private_key_here
```

## Configuration

The server uses the following configuration:
- **Base URL**: `http://localhost:4021` (payment server endpoint)
- **Payment Endpoint**: `/pay` (invoice payment endpoint)
- **Private Key**: Loaded from `PRIVATE_KEY` environment variable

## Available Tools

### Payment Tools

#### 1. pay-invoice
Processes invoice payments using the X402 protocol.

**Parameters:**
- `invoiceId` (string): The invoice ID to pay

**Example Usage:**
```
Pay invoice: INV-1755771261908-nucuf7k9g
```

#### 2. get-data-from-resource-server
Fetches data from the configured resource server endpoint.

**Parameters:**
- `invoiceId` (string, optional): Invoice ID for payment processing

**Example Usage:**
```
Get data from payment server
```

### Invoice Management Tools

#### 3. create-invoice
Creates a new invoice with specified amount and description.

**Parameters:**
- `amount` (string): Invoice amount (e.g., '$10.50')
- `description` (string): Description of the invoice

**Example Usage:**
```
Create invoice for $25.00 for web development services
```

#### 4. get-invoice-status
Retrieves the status and details of a specific invoice.

**Parameters:**
- `invoiceId` (string): The invoice ID to check status for

**Example Usage:**
```
Get status of invoice INV-1755771261908-nucuf7k9g
```

#### 5. list-invoices
Retrieves a list of all invoices in the system.

**Parameters:**
- None

**Example Usage:**
```
List all invoices
```

#### 6. get-invoice-summary
Gets a summary of invoice statistics (pending, paid, total counts).

**Parameters:**
- None

**Example Usage:**
```
Get invoice summary statistics
```

### Utility Tools

#### 7. add
Performs addition of two numbers.

**Parameters:**
- `a` (number): First number
- `b` (number): Second number

**Example Usage:**
```
Add 5 + 3
```

## Usage

1. Start the MCP server:
```bash
npm start
# or
node src/server.js
```

2. The server will connect via stdio transport and be ready to receive MCP requests.

3. Configure your AI assistant (like Claude Desktop) to use this MCP server by adding it to your configuration:

```json
{
  "mcpServers": {
    "x402-payment": {
      "command": "node",
      "args": ["path/to/X402MCP/src/server.js"],
      "env": {
        "PRIVATE_KEY": "your_private_key_here"
      }
    }
  }
}
```

## Architecture

The server is built using:
- **@modelcontextprotocol/sdk**: MCP server framework
- **x402-axios**: Payment interceptor for HTTP requests
- **viem**: Ethereum wallet and account management
- **axios**: HTTP client for API requests
- **zod**: Schema validation for tool parameters

## Payment Flow

1. AI assistant requests invoice payment via `pay-invoice` tool
2. Server creates payment request to `/pay?invoiceId={id}`
3. x402-axios interceptor handles payment authentication
4. Payment is processed using the configured Ethereum wallet
5. Server returns payment confirmation with invoice details

## Error Handling

The server includes comprehensive error handling for:
- Environment variable loading
- Wallet account creation
- HTTP client initialization
- MCP server setup
- Tool registration
- Payment processing
- Data fetching operations

All errors are logged with detailed messages and the server exits gracefully on critical failures.

## Security Considerations

- **Private Keys**: Always use environment variables for private keys
- **Network Security**: Ensure payment server endpoints use HTTPS in production
- **Access Control**: Restrict access to the MCP server in production environments
- **Key Management**: Use secure key management practices for private keys

## Development

### Project Structure
```
X402MCP/
├── src/
│   ├── config/
│   │   └── index.js           # Configuration management
│   ├── tools/
│   │   ├── paymentTools.js    # Payment-related tools
│   │   ├── invoiceTools.js    # Invoice management tools
│   │   └── utilityTools.js    # Utility tools (add, etc.)
│   ├── types/
│   │   └── index.js           # Type definitions
│   ├── utils/
│   │   ├── client.js          # Payment client setup
│   │   └── toolRegistry.js    # Tool registration utilities
│   ├── index.js               # Main exports
│   └── server.js              # Main MCP server implementation
├── package.json               # Node.js dependencies
├── package-lock.json          # Dependency lock file
├── .env                       # Environment variables (create this)
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

### Adding New Tools

To add a new tool to the server:

1. Register the tool using `server.registerTool()`:
```javascript
server.registerTool("tool-name", {
  title: "Tool Title",
  description: "Tool description",
  inputSchema: { /* zod schema */ }
}, async (params) => {
  // Tool implementation
});
```

2. Add error handling and logging
3. Test the tool functionality

## Troubleshooting

### Common Issues

1. **Private Key Not Found**
   - Ensure `PRIVATE_KEY` is set in your `.env` file
   - Check that the private key format is correct (0x prefix)

2. **Payment Server Connection Failed**
   - Verify the payment server is running on `http://localhost:4021`
   - Check network connectivity and firewall settings

3. **402 Payment Required Errors**
   - Ensure wallet has sufficient funds for payments
   - Verify the invoice ID is correct and not already paid

4. **Tool Not Found Errors**
   - Restart the MCP server after making changes
   - Check that all tools are properly registered

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with proper error handling and logging
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the X402Invoicer system. See the main project LICENSE file for details.

## Support

For issues and questions:
1. Check the troubleshooting section above
2. Review server logs for detailed error messages
3. Ensure all prerequisites are met
4. Verify environment configuration

## Related Projects

- **X402 Protocol**: Payment protocol for HTTP requests
- **x402-axios**: Axios interceptor for X402 payments
- **Model Context Protocol**: Framework for AI tool integration

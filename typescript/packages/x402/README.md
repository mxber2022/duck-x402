# duck-x402

Core TypeScript implementation of the x402 Payment Protocol with DuckChain support. This package provides the foundational types, schemas, and utilities that power all x402 integrations, including multi-network support for Base, Avalanche, IoTeX, Sei, Kaia, Kairos, and DuckChain.

## Installation

```bash
npm install duck-x402
```

## Overview

The duck-x402 package provides the core building blocks for implementing the x402 Payment Protocol in TypeScript with comprehensive blockchain support. It's designed to be used by:

- Middleware implementations (Express, Hono, Next.js)
- Client-side payment handlers (fetch wrapper)
- Facilitator services
- Custom integrations

## 🦆 DuckChain Support

This package includes full support for DuckChain (Chain ID: 5545) with:
- **Native Currency**: TON
- **Token Support**: DUCK token at `0xda65892ea771d3268610337e9964d916028b7dad`
- **RPC Endpoints**: `https://rpc.duckchain.io`, `https://rpc-hk.duckchain.io`
- **Block Explorer**: `https://explorer.duckchain.io`

## 🌐 Multi-Network Support

Supported networks include:
- **Base**: Mainnet and Sepolia testnet
- **Avalanche**: C-Chain mainnet
- **IoTeX**: Mainnet
- **Sei**: Mainnet and testnet
- **Kaia**: Mainnet
- **Kairos**: Mainnet
- **DuckChain**: Mainnet

## Integration Packages

This core package is used by the following integration packages:

- `duck-x402express`: Express.js middleware
- `duck-x402-hono`: Hono middleware
- `duck-x402-next`: Next.js middleware
- `duck-x402-fetch`: Fetch API wrapper
- `duck-x402-axios`: Axios interceptor

## Manual Server Integration

If you're not using one of our server middleware packages, you can implement the x402 protocol manually. Here's what you'll need to handle:

1. Return 402 error responses with the appropriate response body
2. Use the facilitator to validate payments
3. Use the facilitator to settle payments
4. Return the appropriate response header to the caller

For a complete example implementation, see our [advanced server example](https://github.com/mxber2022/duck-x402/tree/main/examples/typescript/servers/advanced) which demonstrates both synchronous and asynchronous payment processing patterns.

## Manual Client Integration

If you're not using our `duck-x402-fetch` or `duck-x402-axios` packages, you can manually integrate the x402 protocol in your client application. Here's how:

1. Make a request to a x402-protected endpoint. The server will respond with a 402 status code and a JSON object containing:
   - `x402Version`: The version of the x402 protocol being used
   - `accepts`: An array of payment requirements you can fulfill

2. Select the payment requirement you wish to fulfill from the `accepts` array

3. Create the payment header using the selected payment requirement

4. Retry your network call with:
   - The payment header assigned to the `X-PAYMENT` field
   - The `Access-Control-Expose-Headers` field set to `"X-PAYMENT-RESPONSE"` to receive the server's transaction response

For implementation examples, we recommend reviewing our official client packages:
- [duck-x402-fetch implementation](https://github.com/mxber2022/duck-x402/blob/main/typescript/packages/x402-fetch/src/index.ts)
- [duck-x402-axios implementation](https://github.com/mxber2022/duck-x402/blob/main/typescript/packages/x402-axios/src/index.ts)

## 🚀 Quick Start with DuckChain

```typescript
import { paymentMiddleware } from "duck-x402express";

app.use(paymentMiddleware(
  "0xYourAddress",
  {
    "/duckchain-endpoint": {
      price: "$0.01",
      network: "duckchain", // 🦆 DuckChain support!
      config: {
        description: "DuckChain mainnet endpoint"
      }
    }
  }
));
```

## 📚 Documentation

For more information about the x402 Payment Protocol, visit our [documentation](https://github.com/mxber2022/duck-x402).


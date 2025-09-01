# duck-x402-axios

Axios interceptor for the x402 Payment Protocol with DuckChain support. This package allows you to easily add payment functionality to your Axios HTTP client using the x402 protocol across multiple networks including DuckChain.

## Installation

```bash
npm install duck-x402-axios
```

## Quick Start

```typescript
import axios from "axios";
import { withPaymentInterceptor } from "duck-x402-axios";
import { createWalletClient, http } from "viem";
import { duckchain } from "viem/chains";

// Create a wallet client for DuckChain
const walletClient = createWalletClient({
  chain: duckchain,
  transport: http()
});

// Create an Axios instance with payment interceptor
const client = withPaymentInterceptor(axios.create(), walletClient);

// Make requests - the interceptor automatically handles 402 responses
const response = await client.get('https://api.example.com/duckchain-endpoint');
```

## 🦆 DuckChain Support

This package includes full support for DuckChain (Chain ID: 5545) with:
- **Native Currency**: TON
- **Token Support**: DUCK token at `0xda65892eA771d3268610337E9964D916028B7dAD`
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

## How It Works

The `withPaymentInterceptor` function adds a response interceptor to your Axios client that:

1. **Intercepts 402 responses** from x402-protected endpoints
2. **Extracts payment requirements** from the response
3. **Creates payment headers** using your wallet client
4. **Automatically retries** the request with the payment header
5. **Exposes payment response** in the `X-PAYMENT-RESPONSE` header

## API Reference

### `withPaymentInterceptor(axiosClient, walletClient, paymentRequirementsSelector?)`

#### Parameters

- **`axiosClient`**: Your Axios instance
- **`walletClient`**: A wallet client that can sign transactions and create payment headers
- **`paymentRequirementsSelector`**: (Optional) Function to select payment requirements from multiple options

#### Returns

The modified Axios instance with the payment interceptor

## Examples

### Basic Usage

```typescript
import { withPaymentInterceptor } from "duck-x402-axios";

const client = withPaymentInterceptor(
  axios.create(),
  walletClient
);

// The client automatically handles 402 responses
const response = await client.get('https://api.example.com/premium-content');
```

### DuckChain API Endpoint

```typescript
// Configure your API to use DuckChain payments
const client = withPaymentInterceptor(
  axios.create(),
  duckchainWalletClient
);

// Access DuckChain-protected endpoint
const response = await client.post('https://api.example.com/ai/generate-image', {
  prompt: "A cute duck in space"
});
```

### Custom Payment Requirements Selector

```typescript
import { selectPaymentRequirements } from "duck-x402/client";

const customSelector = (requirements, network, scheme) => {
  // Prefer DuckChain if available
  const duckchainReq = requirements.find(req => req.network === "duckchain");
  if (duckchainReq) return duckchainReq;
  
  // Fall back to default selector
  return selectPaymentRequirements(requirements, network, scheme);
};

const client = withPaymentInterceptor(
  axios.create(),
  walletClient,
  customSelector
);
```

### Error Handling

```typescript
try {
  const response = await client.get('https://api.example.com/protected-endpoint');
  console.log('Payment successful:', response.data);
} catch (error) {
  if (error.response?.status === 402) {
    console.error('Payment required but failed:', error.response.data);
  } else {
    console.error('Request failed:', error.message);
  }
}
```

## Integration with x402 Express Server

```typescript
// Server side (using duck-x402express)
app.use(paymentMiddleware(
  "0xYourAddress",
  {
    "/api/duckchain": {
      price: "$0.01",
      network: "duckchain",
      config: {
        description: "DuckChain API access"
      }
    }
  }
));

// Client side (using duck-x402-axios)
const client = withPaymentInterceptor(axios.create(), duckchainWallet);
const response = await client.get('https://yourserver.com/api/duckchain');
```

## TypeScript Support

This package includes full TypeScript support with proper type definitions for:
- Payment requirements
- Wallet clients
- Axios interceptors
- Error handling

## Dependencies

- **duck-x402**: Core x402 protocol implementation
- **axios**: HTTP client library
- **viem**: Ethereum client library (for wallet integration)

## Resources

- [x402 Protocol](https://x402.org)
- [DuckChain Explorer](https://explorer.duckchain.io)
- [duck-x402 Core Package](../x402/README.md)
- [duck-x402express Server Package](../x402-express/README.md)

## License

MIT

import { defineChain } from "viem";

/**
 * Custom chain definitions for networks not available in viem/chains
 */

export const duckchain = defineChain({
  id: 5545,
  name: "DuckChain",
  nativeCurrency: {
    decimals: 18,
    name: "TON",
    symbol: "TON",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.duckchain.io", "https://rpc-hk.duckchain.io"],
    },
    public: {
      http: ["https://rpc.duckchain.io", "https://rpc-hk.duckchain.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "DuckChain Explorer",
      url: "https://explorer.duckchain.io",
    },
  },
//   contracts: {
//     multicall3: {
//       address: "0x0000000000000000000000000000000000000000", // TODO: Update with actual multicall3 address if available
//       blockCreated: 0,
//     },
//   },
});

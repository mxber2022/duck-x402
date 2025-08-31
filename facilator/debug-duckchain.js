import { createPublicClient, http } from 'viem';

// Define DuckChain chain
const duckchain = {
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
};

const client = createPublicClient({
  chain: duckchain,
  transport: http()
});

async function checkToken() {
  const tokenAddress = '0xdA65892eA771d3268610337E9964D916028B7dAD';
  const sender = '0x2f85eE78375686A740e448E7188b800a19742ea3';
  const receiver = '0xA618c4427bb4e05B51e14c3D913640D5e38EDe52';
  
  try {
    console.log('🔍 Checking DuckChain DUCK token contract...');
    console.log('Token Address:', tokenAddress);
    console.log('Sender:', sender);
    console.log('Receiver:', receiver);
    console.log('');
    
    // Check if contract is paused
    try {
      const paused = await client.readContract({
        address: tokenAddress,
        abi: [{ name: 'paused', type: 'function', inputs: [], outputs: [{ type: 'bool' }], stateMutability: 'view' }],
        functionName: 'paused'
      });
      console.log('✅ Contract paused:', paused);
    } catch (error) {
      console.log('❌ Error checking paused state:', error.message);
    }
    
    // Check if sender is blacklisted
    try {
      const senderBlacklisted = await client.readContract({
        address: tokenAddress,
        abi: [{ name: 'isBlacklisted', type: 'function', inputs: [{ type: 'address' }], outputs: [{ type: 'bool' }], stateMutability: 'view' }],
        functionName: 'isBlacklisted',
        args: [sender]
      });
      console.log('✅ Sender blacklisted:', senderBlacklisted);
    } catch (error) {
      console.log('❌ Error checking sender blacklist:', error.message);
    }
    
    // Check if receiver is blacklisted
    try {
      const receiverBlacklisted = await client.readContract({
        address: tokenAddress,
        abi: [{ name: 'isBlacklisted', type: 'function', inputs: [{ type: 'address' }], outputs: [{ type: 'bool' }], stateMutability: 'view' }],
        functionName: 'isBlacklisted',
        args: [receiver]
      });
      console.log('✅ Receiver blacklisted:', receiverBlacklisted);
    } catch (error) {
      console.log('❌ Error checking receiver blacklist:', error.message);
    }
    
    // Check sender balance
    try {
      const balance = await client.readContract({
        address: tokenAddress,
        abi: [{ name: 'balanceOf', type: 'function', inputs: [{ type: 'address' }], outputs: [{ type: 'uint256' }], stateMutability: 'view' }],
        functionName: 'balanceOf',
        args: [sender]
      });
      console.log('✅ Sender balance:', balance.toString());
    } catch (error) {
      console.log('❌ Error checking sender balance:', error.message);
    }
    
    // Check if transferWithAuthorization function exists
    try {
      const hasFunction = await client.readContract({
        address: tokenAddress,
        abi: [{ name: 'TRANSFER_WITH_AUTHORIZATION_TYPEHASH', type: 'function', inputs: [], outputs: [{ type: 'bytes32' }], stateMutability: 'view' }],
        functionName: 'TRANSFER_WITH_AUTHORIZATION_TYPEHASH'
      });
      console.log('✅ TRANSFER_WITH_AUTHORIZATION_TYPEHASH:', hasFunction);
    } catch (error) {
      console.log('❌ Error checking TRANSFER_WITH_AUTHORIZATION_TYPEHASH:', error.message);
    }
    
    // Check current block timestamp
    try {
      const block = await client.getBlock();
      console.log('✅ Current block timestamp:', new Date(Number(block.timestamp) * 1000).toISOString());
      console.log('✅ Current block number:', block.number);
    } catch (error) {
      console.log('❌ Error getting current block:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Error checking token:', error.message);
  }
}

checkToken();

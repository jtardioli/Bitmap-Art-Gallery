interface NetworkConfig {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
}

export function getNetworkConfig(): NetworkConfig {
  if (process.env.NETWORK === "ANVIL") {
    return {
      chainId: "0x7a69", // 31337 - hexadecimal format
      chainName: "Anvil", // replace with your chain name
      nativeCurrency: {
        name: "ETH",
        symbol: "eth",
        decimals: 18,
      },
      rpcUrls: ["http://localhost:8545"], // replace with your network's RPC URL
    };
  } else {
    return {
      chainId: "0x7a69", // 31337 - hexadecimal format
      chainName: "Anvil", // replace with your chain name
      nativeCurrency: {
        name: "ETH",
        symbol: "eth",
        decimals: 18,
      },
      rpcUrls: ["http://localhost:8545"], // replace with your network's RPC URL
    };
  }
}

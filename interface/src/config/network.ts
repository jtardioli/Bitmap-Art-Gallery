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
      chainName: "Anvil",
      nativeCurrency: {
        name: "ETH",
        symbol: "eth",
        decimals: 18,
      },
      rpcUrls: ["http://localhost:8545"], // replace with your network's RPC URL
    };
  } else if (process.env.NEXT_PUBLIC_NETWORK === "SEPOLIA") {
    return {
      chainId: "0xaa36a7", // 11155111 - hexadecimal format
      chainName: "Sepolia",
      nativeCurrency: {
        name: "ETH",
        symbol: "eth",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.sepolia.dev"], // replace with your network's RPC URL
      blockExplorerUrls: ["https://sepolia.etherscan.io/"],
    };
  } else if (process.env.NEXT_PUBLIC_NETWORK === "BASE") {
    return {
      chainId: "0x2105",
      chainName: "Base",
      nativeCurrency: {
        name: "ETH",
        symbol: "eth",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.base.org"], // replace with your network's RPC URL
      blockExplorerUrls: ["https://basescan.org"],
    };
  } else {
    throw new Error("Invalid network: unable to return chain config");
  }
}

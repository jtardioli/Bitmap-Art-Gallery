import { Color } from "./ts/utils";

export const colors: Record<string, Color> = {
  "0": "#ffffff",
  "1": "#aaaaaa",
  "2": "#555555",
  "3": "#000000",
  "4": "#ffff54",
  "5": "#00aa01",
  "6": "#55ff54",
  "7": "#ff5555",
  "8": "#aa0101",
  "9": "#aa5501",
  a: "#aa01aa",
  b: "#ff55ff",
  c: "#55fffe",
  d: "#00aaaa",
  e: "#0000aa",
  f: "#5555ff",
};

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

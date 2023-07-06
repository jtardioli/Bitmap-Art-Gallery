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

export const rinkeby = {
  chainId: `0x${Number(4).toString(16)}`,
  chainName: "Rinkeby",
  nativeCurrency: {
    name: "Rinkeby Ether",
    symbol: "RIN",
    decimals: 18,
  },
  rpcUrls: ["https://rinkeby.infura.io/v3/"],
  blockExplorerUrls: ["https://rinkeby.etherscan.io"],
};

// chainId: `0x${Number(137).toString(16)}`,
// chainName: "Polygon Mainnet",
// nativeCurrency: {
//   name: "MATIC",
//   symbol: "MATIC",
//   decimals: 18
// },
// rpcUrls: ["https://polygon-rpc.com/"],
// blockExplorerUrls: ["https://polygonscan.com/"]

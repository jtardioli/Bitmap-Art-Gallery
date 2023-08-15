// export const bitmapContractAddress =

import { error } from "console";

//   "0x4bc3e56554183f5228acCA61Fb5A81a596562065";
export function getBitmapContractAddress() {
  if (process.env.NEXT_PUBLIC_NETWORK === "ANVIL") {
    return "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  } else if (process.env.NEXT_PUBLIC_NETWORK === "SEPOLIA") {
    return "0x2051Fe3596caB7f5A1D93913CcE4aA0E0399779c";
  } else if (process.env.NEXT_PUBLIC_NETWORK === "BASE") {
    return "0x2C5dd041C8BaBE0c4AAa9617e334cb9F23dF1673";
  } else {
    throw new Error("Invalid Network");
  }
}

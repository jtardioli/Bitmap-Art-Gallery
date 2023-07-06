import { ethers } from "ethers";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { EVMAddress } from "../ts/utils";

declare let window: any;

interface WalletContextInterface {
  address: EVMAddress | null;
  setAddress: (address: EVMAddress) => void;
  message: string;
  setMessage: (message: string) => void;
  provider: any;
}

const WalletContext = createContext<WalletContextInterface>(undefined!);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState<EVMAddress | null>(null);
  const [message, setMessage] = useState("Connect Wallet");

  const [provider, setProvider] = useState<any>(
    new ethers.providers.JsonRpcProvider(
      String(process.env.NEXT_PUBLIC_INFURA_KEY)
    )
  );

  const value: WalletContextInterface = {
    address,
    setAddress,
    provider,
    message,
    setMessage,
  };
  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export const useWallet: () => WalletContextInterface = () => {
  const walletContext = useContext(WalletContext);
  if (walletContext === null) {
    throw new Error(
      "useWallet() can only be used inside of <WalletProvider />, " +
        "please declare it at a higher level."
    );
  }

  return walletContext;
};

export default WalletProvider;

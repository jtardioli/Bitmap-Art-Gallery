import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

/* This avoids errors when accessing window.ethereum */
declare let window: any;

interface WalletContextValue {
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  chainId: string;
  switchNetwork: (desiredChainId: string) => Promise<void>;
  connectWallet: () => Promise<void>;
  provider: Web3Provider | undefined;
}

export const WalletContext = createContext<WalletContextValue>({
  address: "",
  chainId: "",
  setAddress: () => {},
  switchNetwork: async () => {},
  connectWallet: async () => {},
  provider: undefined,
});

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  let provider: Web3Provider | undefined;
  if (typeof window !== "undefined" && window?.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }

  const [address, setAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>("");

  async function connectWallet() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      handleAccountsChanged(accounts);
    } catch (error) {
      console.log("WalletContext::requestAccounts()::", error);
    }
  }

  async function getNetwork() {
    try {
      const networkId = await window.ethereum.request({
        method: "eth_chainId",
      });
      setChainId(networkId);
    } catch (error) {
      console.log("WalletContext::getNetwork()::", error);
    }
  }

  /* 
    1. Check if user is currently connected to desired chain
      a. If they are show the mint button
      b. If they are not prompt them to switch networks 
    2. Display the MINT button
  */
  const switchNetwork = async (desiredChainId: string) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: desiredChainId }],
      });
    } catch (err) {
      console.log("WalletContext::switchNetwork()::", err);
    }
  };

  /* 
   SUBSCRIPTIONS
  */
  function handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      setAddress("");
    } else if (accounts[0] !== address) {
      setAddress(accounts[0]);
    }
  }

  function handleChainChanged(chainId: string) {
    if (chainId) {
      setChainId(chainId);
    }
  }

  /* 
   This makes sure that as the account or network are changed in the wallet 
   our state is updated as well
  */
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
      connectWallet();
      getNetwork();
    }

    return () => {
      if (window.ethereum.removeListener) {
        // unsubscribe on component unmount
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  const value: WalletContextValue = {
    address,
    chainId,
    setAddress,
    switchNetwork,
    connectWallet,
    provider,
  };
  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export const useWallet: () => WalletContextValue = () => {
  const walletContext = useContext(WalletContext);
  if (walletContext === null) {
    throw new Error(
      "useWallet() can only be used inside of <StateProvider />, please declare it at a higher level."
    );
  }
  return walletContext;
};

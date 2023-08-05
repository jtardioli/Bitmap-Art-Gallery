import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
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
import { getNetworkConfig } from "../config/network";

/* This avoids errors when accessing window.ethereum */
declare let window: any;

interface WalletContextValue {
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  chainId: string;
  switchNetwork: (desiredChainId: string) => Promise<void>;
  addNetwork: () => Promise<void>;
  getNetwork: () => Promise<void>;
  connectWallet: () => Promise<void>;
  provider: JsonRpcProvider | undefined;
  userProvider: Web3Provider | undefined;
}

export const WalletContext = createContext<WalletContextValue>({
  address: "",
  chainId: "",
  setAddress: () => {},
  switchNetwork: async () => {},
  addNetwork: async () => {},
  getNetwork: async () => {},
  connectWallet: async () => {},
  provider: undefined,
  userProvider: undefined,
});

const WALLET_CONNECTED = "wallet_connected";

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );
  let userProvider: Web3Provider | undefined;
  if (typeof window !== "undefined" && window.ethereum) {
    userProvider = new ethers.providers.Web3Provider(window.ethereum);
  }

  const [address, setAddress] = useState<string>("");
  const [chainId, setChainId] = useState<string>("");

  async function connectWallet() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      handleAccountsChanged(accounts);
      localStorage.setItem(WALLET_CONNECTED, JSON.stringify(true));
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

  async function addNetwork() {
    const networkConfig = getNetworkConfig();
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [networkConfig],
      });
      console.log("WalletContext::addNetwork() - Success", networkConfig);
    } catch (err: any) {
      console.log("WalletContext::addNetwork() -", err);
    }
  }

  /* 
    1. Check if user is currently connected to desired chain
      a. If they are show the mint button
      b. If they are not prompt them to switch networks 
    2. Display the MINT button
  */
  async function switchNetwork(desiredChainId: string) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: desiredChainId }],
      });
    } catch (err: any) {
      console.log("WalletContext::switchNetwork() -", err);
      if (err?.code === 4902) {
        console.log("WalletContext::switchNetwork() - Trying to add network");
        addNetwork();
      }
    }
  }

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
      const prevConnectedWallet = localStorage.getItem(WALLET_CONNECTED);
      (async () => {
        if (prevConnectedWallet) {
          await connectWallet();
          await getNetwork();
        }
      })();
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
    addNetwork,
    getNetwork,
    connectWallet,
    provider,
    userProvider,
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

import { ethers } from "ethers";
import {
  bitmapContractABI,
  bitmapContractAddress,
} from "../contracts/bitmapContract";
import { Web3Provider } from "@ethersproject/providers";

import styles from "../styles/Home.module.css";
import { useState } from "react";

declare let window: any;

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const chainID = "0x7a69";

const MintButton = ({ currentHex }: { currentHex: string }) => {
  const [message, setMessage] = useState("Connect Wallet");

  let provider: Web3Provider | undefined;

  if (typeof window !== "undefined") {
    if (window?.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  /* 
    Check If user has a browser wallet installed if they do request accounts
  */
  const connectWallet = async () => {
    if (typeof window !== "undefined") {
      if (window?.ethereum) {
        await window.ethereum.enable();
      } else {
        setMessage("Install Metamask");
      }
    }
  };

  /* 
    1. Check if user is currently connected to desired chain
      a. If they are show the mint button
      b. If they are not prompt them to switch networks 
    2. Display the MINT button
  */
  const validateNetwork = async () => {
    try {
      const currentChainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      if (currentChainId === chainID) {
        setMessage("MINT");
        return;
      }
      setMessage("Switch To Optimism");

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainID }],
      });
      setMessage("MINT");
    } catch (err) {
      setMessage("Add Optimism Network");
    }
  };

  const handleMintClick = async () => {
    await connectWallet();
    await validateNetwork();

    const bitmapContract = new ethers.Contract(
      bitmapContractAddress,
      bitmapContractABI,
      provider?.getSigner()
    );

    setMessage("Loading");
    const tx = await bitmapContract.mint(`0x${currentHex}`);
    await tx.wait();
    sleep(1000);
    setMessage("Mint");
    return;
  };

  return (
    <button className={styles.rainbow} onClick={handleMintClick}>
      {message}
    </button>
  );
};

export default MintButton;

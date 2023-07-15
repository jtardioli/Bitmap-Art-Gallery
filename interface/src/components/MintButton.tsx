import { ethers } from "ethers";
import {
  bitmapContractABI,
  bitmapContractAddress,
} from "../contracts/bitmapContract";

import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useWallet } from "../contexts/WalletContext";
import { Circles, SpinningCircles } from "react-loading-icons";
import { createDelay } from "../utils/time";

const optimismChainId = "0x7a69";

enum MintButtonMode {
  WALLET_NOT_CONNECTED,
  WRONG_NETWORK_SELECTED,
  READY_TO_MINT,
  LOADING,
  ERROR,
  MINT_COMPLETED,
}

const MintButton = ({ currentHex }: { currentHex: string }) => {
  const { address, provider, chainId, connectWallet, switchNetwork } =
    useWallet();
  const [mintButtonMode, setMintButtonMode] = useState<MintButtonMode>();

  useEffect(() => {
    (async () => {
      /* Check if there is a connected wallet */
      if (!address) {
        setMintButtonMode(MintButtonMode.WALLET_NOT_CONNECTED);
        return;
      }

      /* Check if user is connected to the desired chain */
      if (chainId !== optimismChainId) {
        setMintButtonMode(MintButtonMode.WRONG_NETWORK_SELECTED);
        return;
      }

      setMintButtonMode(MintButtonMode.READY_TO_MINT);
    })();
  }, [address, chainId]);

  const handleMintClick = async () => {
    if (mintButtonMode === MintButtonMode.WALLET_NOT_CONNECTED) {
      await connectWallet();
      return;
    }

    if (mintButtonMode === MintButtonMode.WRONG_NETWORK_SELECTED) {
      await switchNetwork(optimismChainId);
      return;
    }

    if (mintButtonMode === MintButtonMode.READY_TO_MINT) {
      try {
        const bitmapContract = new ethers.Contract(
          bitmapContractAddress,
          bitmapContractABI,
          provider?.getSigner()
        );

        setMintButtonMode(MintButtonMode.LOADING);
        const tx = await bitmapContract.mint(`0x${currentHex}`);
        await tx.wait();

        /* 
          This delays makes sure there is enough time for 
          the user to see the wallet buttons displays success 
        */
        setMintButtonMode(MintButtonMode.MINT_COMPLETED);

        await createDelay(1500);

        setMintButtonMode(MintButtonMode.READY_TO_MINT);
      } catch (error: any) {
        // User declined the transaction
        if (error.code === 4001) {
          setMintButtonMode(MintButtonMode.READY_TO_MINT);
          return;
        }
        setMintButtonMode(MintButtonMode.READY_TO_MINT);
      }
    }
  };

  return (
    <button className={styles.rainbow} onClick={handleMintClick}>
      {mintButtonMode === MintButtonMode.WALLET_NOT_CONNECTED &&
        "Connect Wallet"}
      {mintButtonMode === MintButtonMode.WRONG_NETWORK_SELECTED &&
        "Switch to optimism"}
      {mintButtonMode === MintButtonMode.READY_TO_MINT && "MINT"}
      {mintButtonMode === MintButtonMode.LOADING && (
        <Circles height="3rem" fill="black" />
      )}
      {mintButtonMode === MintButtonMode.MINT_COMPLETED && "Mint Complete"}
    </button>
  );
};

export default MintButton;

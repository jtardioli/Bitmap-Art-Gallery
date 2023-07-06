import { ethers } from "ethers";
import { useWallet } from "../contexts/WalletContext";
import {
  bitmapContractABI,
  bitmapContractAddress,
} from "../contracts/bitmapContract";
import styles from "../styles/Home.module.css";

declare let window: any;

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const chainID = "0x7a69";

const MintButton = ({ currentHex }: { currentHex: string }) => {
  const { address, setAddress, message, setMessage } = useWallet();

  let provider: any;

  if (typeof window !== "undefined") {
    if (window?.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  const connectWallet = async () => {
    if (typeof window !== "undefined") {
      if (window?.ethereum) {
        const metamaskResponse = await window.ethereum.enable();
        setAddress(metamaskResponse[0]);
        const currentChainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        if (currentChainId === chainID) {
          setMessage("MINT");
          return;
        }
        setMessage("Switch To Rinkeby");
      } else {
        setMessage("Install Metamask");
      }
    }
  };

  const changeNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainID }],
      });
      setMessage("MINT");
    } catch (err) {
      setMessage("Unable To Switch");
    }
  };

  const mintHandler = async () => {
    const bitmapContract = new ethers.Contract(
      bitmapContractAddress,
      bitmapContractABI,
      provider.getSigner()
    );

    setMessage("Loading");
    const tx = await bitmapContract.mint(`0x${currentHex}`);
    await tx.wait();
    sleep(1000);
    setMessage("Mint");
  };

  const onClickHandler = () => {
    if (message === "Install Metamask") {
      return;
    }
    if (!address) {
      connectWallet();
      return;
    }
    if (message === "Switch To Rinkeby") {
      changeNetwork();
      return;
    }
    if (message === "MINT") {
      mintHandler();
      return;
    }
  };
  return (
    <button className={styles.rainbow} onClick={onClickHandler}>
      {message}
    </button>
  );
};

export default MintButton;

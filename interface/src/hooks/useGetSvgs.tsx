import React, { useEffect, useState } from "react";

import { ethers } from "ethers";
import {
  bitmapContractABI,
  bitmapContractAddress,
} from "../contracts/bitmapContract";
import { Web3Provider } from "@ethersproject/providers";

declare let window: any;

const useGetSvgs = () => {
  let provider: Web3Provider | undefined;

  if (typeof window !== "undefined") {
    if (window?.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  const bitmapContract = new ethers.Contract(
    bitmapContractAddress,
    bitmapContractABI,
    provider
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [svgs, setSvgs] = useState<{ image: string; tokenId: number }[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        let totalSupply = await bitmapContract.totalSupply();
        totalSupply = totalSupply.toNumber();

        // Loop through the tokenURIs and create a promise that fetches the svg for each one
        const svgsPromise: Promise<string>[] = [];
        for (let i = totalSupply - 1; i >= 0; i--) {
          let svgPromise = bitmapContract.tokenSvg(i);
          svgsPromise.push(svgPromise);
        }

        let rawSvgs = await Promise.all(svgsPromise);

        const processedSvgs = rawSvgs.map((item, index) => {
          // Need to remove this part of the svg string for them to render properly
          let svg = item.replace(
            '<?xml version="1.0" encoding="UTF-8" standalone="no"?>',
            ""
          );
          svg = encodeURIComponent(svg);
          return { image: svg, tokenId: totalSupply - 1 - index };
        });

        setSvgs(processedSvgs);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    })();
  }, []);

  return { svgs, isLoading, isError };
};

export default useGetSvgs;

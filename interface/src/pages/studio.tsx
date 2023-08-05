import { hexlify, randomBytes } from "ethers/lib/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import MintButton from "../components/MintButton";

import { RiGalleryLine } from "react-icons/ri";
import Link from "next/link";
import { useCanvasHistory } from "../hooks/useCanvasHistory";
import { colors } from "../config/colors";

export const defaultHex =
  "0000000000000000000000000000000000000000000000000000000000000000";

const Home: NextPage = () => {
  const [hex, setHex] = useState<string>(defaultHex);
  /* 
    Having a separate displayed hex allows the user to edit the hex without causing 
    potential errors while rendering the canvas.
  */
  const [displayedHex, setDisplayedHex] = useState<string>(defaultHex);

  const [selectedHexValue, setSelectedHexValue] = useState<string>("0"); // Note this is the selected color as well

  const {
    syncHistoryOnCanvasUpdate,
    handleRedo,
    handleUndo,
    handleResetHistory,
  } = useCanvasHistory(setHex);

  const updateHex = (newHex: string): void => {
    syncHistoryOnCanvasUpdate(newHex);
    setHex(newHex);
    setDisplayedHex(newHex);
  };

  const randomizeHex = (): void => {
    const randomHex = `${hexlify(randomBytes(32)).split("0x")[1]}`;
    setHex(randomHex);
    setDisplayedHex(randomHex);
    handleResetHistory();
  };

  return (
    <>
      <Head>
        <title>Studio - Bitmap Art</title>
        <meta
          name="Bitmap Art"
          content="on-chain 8x8 bitmap svg packed into a single storage slot"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center w-full h-screen ">
        <section className="flex items-center justify-center w-full py-5 bg-black">
          <nav className="absolute items-center px-2 ml-auto left-3">
            <Link href="/gallery">
              <div className="flex items-center hover:cursor-pointer">
                <RiGalleryLine color="white" size={25} />
                <p className="ml-2 text-white">Gallery</p>
              </div>
            </Link>
          </nav>

          <p className="invisible mr-4 text-lg text-white lg:visible">
            Your Hex:
          </p>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length === 64) {
                setHex(e.target.value);
              }
              setDisplayedHex(e.target.value);
            }}
            value={displayedHex}
            className="invisible w-7/12 p-1 text-center rounded-sm shadow-inner lg:visible"
          />
          <button
            className="absolute items-center px-6 py-1 ml-4 bg-pink-300 rounded-sm lg:static right-3"
            onClick={randomizeHex}
          >
            Random
          </button>
        </section>

        <div className="flex flex-col items-center justify-center w-full h-screen gap-8 md:flex-row">
          {/* Canvas */}
          <div
            className="grid grid-cols-8 mb-5 bg-white md:mb-0"
            style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
          >
            {hex.split("").map((h, i) => {
              return (
                <div
                  onClick={() => {
                    updateHex(
                      hex.substring(0, i) +
                        selectedHexValue +
                        hex.substring(i + 1)
                    );
                  }}
                  key={i}
                  className="cursor-pointer w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 hover:border-2 hover:border-solid hover:border-black"
                  style={{ backgroundColor: colors[h] }}
                ></div>
              );
            })}
          </div>
          {/* Color Selection */}
          <div>
            <div className="grid grid-cols-8 gap-2 mb-5 md:grid-cols-4">
              {Object.keys(colors).map((hexValue: string) => {
                return (
                  <div
                    key={hexValue}
                    className={`flex items-center justify-center w-12 h-12 lg:w-20 lg:h-20 text-2xl font-light  hover:border-2 hover:border-solid hover:border-black cursor-pointer  rounded-sm `}
                    onClick={() => {
                      setSelectedHexValue(hexValue);
                    }}
                    style={{
                      backgroundColor: colors[hexValue],
                      border:
                        hexValue === selectedHexValue ? "solid 2px black" : "",
                    }}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between w-full ">
              <div className="flex gap-1 lg:gap-4">
                <button
                  onClick={handleUndo}
                  className="px-5 py-1 text-gray-100 bg-black rounded-sm "
                >
                  Undo
                </button>

                <button
                  onClick={handleRedo}
                  className="px-5 py-1 text-gray-100 bg-black rounded-sm "
                >
                  Redo
                </button>
              </div>

              <button
                onClick={() => {
                  setHex(defaultHex);
                  setDisplayedHex(defaultHex);
                  handleResetHistory();
                }}
                className="px-5 py-1 ml-1 text-white bg-red-600 rounded-sm"
              >
                Reset
              </button>
            </div>
            <MintButton currentHex={hex} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

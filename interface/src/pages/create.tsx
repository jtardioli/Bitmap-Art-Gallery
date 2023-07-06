import { hexlify, randomBytes } from "ethers/lib/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useState } from "react";
import MintButton from "../components/MintButton";
import { colors } from "../config";
import { RiGalleryLine } from "react-icons/ri";
import Link from "next/link";

const defaultHex =
  "0000000000000000000000000000000000000000000000000000000000000000";

const Home: NextPage = () => {
  const [hex, setHex] = useState<string>(defaultHex);
  const [text, setText] = useState<string>(defaultHex);
  const [selectedHexValue, setSelectedHexValue] = useState<string>("0");
  const [history, setHistory] = useState<string[]>([defaultHex]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const updateHex = (newHex: string): void => {
    // clear history path if change is made
    if (historyIndex !== history.length - 1 && history.length > 1) {
      setHistory((prev) => {
        return prev.slice(0, historyIndex + 1);
      });
    }
    setHistory((prev) => {
      return [...prev, newHex];
    });
    setHistoryIndex((prev) => prev + 1);
    setHex(newHex);
    setText(newHex);
  };

  const randomizeHex = (): void => {
    const randomHex = `${hexlify(randomBytes(32)).split("0x")[1]}`;
    setHex(randomHex);
    setText(randomHex);
  };

  return (
    <>
      <Head>
        <title>BitmatArt - Create</title>
        <meta
          name="Bitmap Art"
          content="on-chain 8x8 bitmap svg packed into a single storage slot"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center w-full h-screen ">
        <div className="flex items-center justify-center w-full mt-5 ">
          <nav className="absolute items-center px-2 ml-auto left-3">
            <Link href="/gallery">
              <div className="flex items-center hover:cursor-pointer">
                <RiGalleryLine size={25} />
                <p className="ml-2">Gallery</p>
              </div>
            </Link>
          </nav>

          <p className="mr-4 text-lg">Your Hex:</p>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length === 64) {
                setHex(e.target.value);
              }
              setText(e.target.value);
            }}
            value={text}
            className="w-7/12 p-1 text-center"
          />
          <button className="p-1 ml-4 bg-white" onClick={randomizeHex}>
            Random
          </button>
        </div>

        <div className="flex flex-col items-center justify-center w-full h-screen md:flex-row">
          <div className="grid grid-cols-8 mb-5 mr-8 bg-white md:mb-0">
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
                  className="w-12 h-12 cursor-pointer md:w-20 md:h-20 hover:border-2 hover:border-solid hover:border-black"
                  style={{ backgroundColor: colors[h] }}
                ></div>
              );
            })}
          </div>
          <div>
            <div className="grid grid-cols-4 gap-2 mb-5">
              {Object.keys(colors).map((hexValue: string) => {
                return (
                  <div
                    key={hexValue}
                    onClick={() => {
                      setSelectedHexValue(hexValue);
                    }}
                    className={`flex items-center justify-center w-12 h-12 md:w-20 md:h-20 text-2xl font-light  hover:border-2 hover:border-solid hover:border-black cursor-pointer `}
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
              <button
                onClick={() => {
                  if (historyIndex - 1 >= 0) {
                    setHex(history[historyIndex - 1]);
                    setHistoryIndex((prev) => prev - 1);
                  }
                }}
                className="px-5 py-1 border-2 border-black"
              >
                Undo
              </button>

              <button
                onClick={() => {
                  if (historyIndex + 1 <= history.length - 1) {
                    setHex(history[historyIndex + 1]);
                    setHistoryIndex((prev) => prev + 1);
                  }
                }}
                className="px-5 py-1 border-2 border-black"
              >
                Redo
              </button>

              <button
                onClick={() => {
                  setHex(defaultHex);
                  setHistory([defaultHex]);
                  setHistoryIndex(0);
                  setText(defaultHex);
                }}
                className="px-5 py-1 text-red-600 border-2 border-red-600"
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

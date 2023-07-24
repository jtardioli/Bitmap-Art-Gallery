import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import useGetSvgs from "../hooks/useGetSvgs";
import NavBar from "../components/NavBar";
import { Grid } from "react-loading-icons";
import { useRouter } from "next/router";

const All: NextPage = () => {
  const router = useRouter();

  const { svgs, isLoading, isError } = useGetSvgs();

  const noSvgs = !isLoading && !isError && svgs.length === 0;

  return (
    <>
      <Head>
        <title>Gallery - Bitmap Art</title>
        <meta
          name="Bitmap Art"
          content="on-chain 8x8 bitmap svg packed into a single storage slot"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="flex justify-center w-full pt-40 pb-10">
        {isLoading && (
          <div className="mt-32">
            <Grid fill="black" width="50px" />
          </div>
        )}
        {isError && (
          <div className="flex flex-col items-center justify-center border-2 border-gray-400 shadow-lg rounded-lg h-[400px] w-[600px] bg-white mx-4">
            <p className="text-3xl te">Something went wrong</p>
            <p className="text-gray-600">
              Unable to fetch the gallery from the blockchain
            </p>

            <button
              className="top-0 px-10 py-4 mt-16 text-2xl bg-black rounded-lg text-slate-100"
              onClick={() => {
                router.reload();
              }}
            >
              Refresh the page
            </button>
          </div>
        )}
        {noSvgs && (
          <div className="flex flex-col items-center justify-center border-2 border-gray-400 shadow-lg rounded-lg h-[400px] w-[600px] bg-white mx-4">
            <p className="text-3xl te">You&apos;re the first one here!</p>
            <p className="text-gray-600">
              Be the first to add your creation to the gallery
            </p>
            <Link href="/studio">
              <button className="top-0 px-10 py-4 mt-16 text-2xl bg-black rounded-lg text-slate-100 animate-bounce ">
                Go to studio
              </button>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-14">
          {svgs.map((svg) => {
            return (
              <div
                className="flex items-center justify-center overflow-hidden "
                key={svg.image}
              >
                <div className="flex flex-col justify-center z-1 drop-shadow-lg">
                  <div
                    className="h-[375px] w-[375px] border-2 border-gray-800"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,${svg.image}")`,
                    }}
                  ></div>
                  <div className="mt-2 overflow-hidden bg-gray-800 rounded-t-sm rounded-b-lg">
                    <p className="p-2 text-center text-slate-100">
                      #{svg.tokenId}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default All;

import { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import Link from "next/link";

const Home: NextPage = () => {
  const images = ["0_1.png", "0_2.png", "0_3.png", "0_4.png"];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isStretched, setIsStretched] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);
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

      <div className="flex flex-col items-center w-full ">
        <NavBar />
        <div className="w-full overflow-x-hidden h-[88vh] mt-32">
          <div
            className="flex h-full"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {images.map((image, index) => (
              <div key={index} className="min-w-full ">
                <img
                  src={`images/${image}`}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
        <section className="flex flex-col gap-6 pt-20 bg-white ">
          <div className="px-4 mb-32 md:px-10 xl:px-28">
            <h1 className="mb-6 text-4xl font-semibold text-center uppercase md:mb-20 md:text-left md:text-5xl">
              Welcome Friend!
            </h1>
            <div className="flex items-center justify-center md:justify-between gap-14">
              <img
                src="images/cool.jpg"
                className="w-[40%] max-w-[600px] border-black border-[1px] shadow-lg hidden md:block"
              />
              <p className="w-full md:max-w-[55%] text-center md:text-left text-2xl text-slate-900 font-light leading-9 tracking-wide">
                Step into the awe-inspiring realm of Bitmap Art, where the
                boundaries of imagination and technology intertwine to create
                captivating visual masterpieces. Prepare to be transported to a
                universe where pixels are the building blocks of creativity, and
                every composition tells a unique story.
              </p>
            </div>
          </div>

          <div
            className="flex flex-col justify-center min-h-screen gap-8 px-4 py-40 md:px-32 clip-path-div text-slate-100"
            style={{
              backgroundImage:
                "linear-gradient(to left, rgba(0,0, 0, .4), rgba(0,0, 0, 0.9),rgba(0,0, 0, 1) ), url(images/0_2.png)",
              backgroundSize: "cover",
            }}
          >
            <h2 className="text-4xl tracking-wide text-center uppercase md:text-left md:text-5xl">
              The Gallery
            </h2>
            <p className="w-full md:max-w-[55%] text-2xl text-center md:text-left text-slate-100 font-light leading-10 tracking-wide">
              As you enter the gallery, your gaze will meet the meticulously
              curated collection of bitmap art pieces. Each artwork suspended on
              the walls showcases the intricate craftsmanship and the
              artist&apos;s ability to harness the power of pixels. The variety
              of styles, themes, and techniques demonstrate the vastness of
              creative expression within the realm of bitmap art.
            </p>
          </div>

          <div className="flex items-center justify-between gap-10 px-4 pb-20 mt-32 md:px-10 xl:px-28 text-slate-900">
            <img
              src="images/forest.jpg"
              className="w-[40%] max-w-[600px] border-black border-[1px] shadow-lg hidden md:block"
            />
            <div className=" flex flex-col w-full md:max-w-[55%] text-2xl text-slate-900 font-light leading-10 tracking-wide">
              <h2 className="mb-8 text-5xl font-bold tracking-wide text-center uppercase md:text-left">
                The Studio
              </h2>
              <p className="w-full text-2xl font-light leading-9 tracking-wide text-center md:text-left text-slate-700">
                Equipped with cutting-edge digital tools, artists can unleash
                their creativity and mint their masterpieces as NFTs on the
                Polygon blockchain. Each artwork is uniquely represented by a
                64-character string, directly saved on the blockchain, ensuring
                its immutable nature. These creations are seamlessly integrated
                into the gallery&apos;s collection, allowing them to be admired
                and cherished by all who visit.
              </p>
              <button
                className="top-0 px-16 py-6 mt-16 bg-black rounded-lg text-slate-100 animate-bounce md:w-[350px]"
                onClick={() => setIsStretched((prev) => !prev)}
              >
                Start Your Journey
              </button>
            </div>
          </div>

          <Link href="/gallery">
            <div
              className="fixed top-0 left-0 z-[50000] w-full  shadow h-[50vh]  text-slate-300 hover:text-white text-8xl flex items-center justify-center tracking-widest uppercase cursor-pointer"
              style={{
                width: isStretched ? "100%" : "0",
                transition: "width 0.5s",
                backgroundImage:
                  "linear-gradient(to right, rgba(0,0, 0, .5), rgba(0,0, 0, .5)),url(images/0_3.png)",
              }}
            >
              {isStretched && (
                <>
                  <p> Gallery</p>
                  <button
                    className="fixed top-0 right-0 px-8 py-4 text-5xl text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsStretched(false);
                    }}
                  >
                    X
                  </button>
                </>
              )}
            </div>
          </Link>

          <Link href="create">
            <div
              className="fixed bottom-0 right-0 z-[50000] w-full shadow h-[50vh] border-t-2 text-slate-300 hover:text-white text-8xl flex items-center justify-center tracking-widest uppercase cursor-pointer"
              style={{
                width: isStretched ? "100%" : "0",
                transition: "width 0.5s",
                backgroundImage:
                  "linear-gradient(to left, rgba(0,0, 0, .55), rgba(0,0, 0, .5)), url(images/0_1.png)",
              }}
            >
              {isStretched && <p>Studio</p>}
            </div>
          </Link>
        </section>
      </div>
    </>
  );
};

export default Home;

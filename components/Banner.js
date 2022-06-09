import React from "react";
import Image from "next/image";
import truncateString from "../helpers/truncateString";
import { useRouter } from "next/router";
const Banner = ({ movie }) => {
  const router = useRouter();
  return (
    <header className="h-[80vh] overflow-hidden relative">
      <div className="relative h-full w-full">
        <Image
          priority
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          layout="fill"
          objectFit="cover"
          className="h-full w-full"
        />
      </div>

      <div className="bg-black bg-opacity-70 md:bg-transparent  md:bg-gradient-to-r md:from-black absolute h-full w-[100%] left-0 top-0 py-40 px-6 flex flex-col items-center justify-center md:block">
        <h2 className="text-2xl text-center md:text-left md:text-4xl lg:text-6xl font-bold max-w-sm text-gray-300 capitalize tracking-wider ">
          {truncateString(movie.title, 32)}
        </h2>

        <p className="text-xs text-center md:text-left md:text-lg max-w-lg leading-8 mt-8 text-gray-300">
          {truncateString(movie.overview, 400)}
        </p>
        <div className="flex items-center gap-5 mt-10 text-sm md:text-lg">
          <button
            onClick={() =>
              router.push(`/movies/${movie.id}`, undefined, { scroll: false })
            }
            className="bg-indigo-600 hover:bg-indigo-100 hover:text-black py-2 px-6 md:px-12 rounded-md transition duration-300"
          >
            Play
          </button>
          <button
            onClick={() =>
              router.push(`/movies/${movie.id}`, undefined, { scroll: false })
            }
            className="border hover:bg-indigo-100 hover:text-black py-2 px-6 md:px-12 rounded-md transition duration-300"
          >
            View Details
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-t from-slate-800  absolute h-7 w-full left-0 bottom-0"></div>
    </header>
  );
};

export default Banner;

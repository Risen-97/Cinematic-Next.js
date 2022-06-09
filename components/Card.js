import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import truncateString from "../helpers/truncateString";
import { motion } from "framer-motion";
const Card = ({ data, route }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const vote =
    data.vote_average < 5
      ? "border-red-500"
      : data.vote_average < 7
      ? "border-orange-500"
      : "border-green-500";

  const voteDot = data.vote_average.toString().split("").includes(".")
    ? data.vote_average
    : data.vote_average + ".0";

  const easing = [0.6, -0.05, 0.01, 0.99];
  const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0,
    },

    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  };

  return (
    <motion.div
      className="relative  w-fit"
      variants={fadeInUp}
      onClick={() =>
        router.push(`/${route}/${data.id}`, undefined, { scroll: false })
      }
    >
      <div className="relative w-[200px] h-[400px] md:w-[300px] md:h-[500px] overflow-hidden rounded-lg shadow-xl group cursor-pointer">
        <div className="absolute left-0 top-0 w-full h-full group-hover:bg-black/50 transition duration-500 z-20 flex items-center justify-center">
          <button className="opacity-0 group-hover:opacity-100 bg-green-600 hover:bg-indigo-100 hover:text-black py-2 px-6 md:px-12 rounded-md transition duration-500">
            View Details
          </button>
        </div>

        {data.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
            alt=""
            layout="fill"
            objectFit="cover"
            className={
              loading
                ? "grayscale blur-2xl scale-110 animate-pulse bg-slate-600"
                : "grayscale-0 blur-0 scale-100 bg-transparent"
            }
            onLoadingComplete={() => setLoading(false)}
          />
        )}

        <div className="absolute w-full h-48 bg-gradient-to-t from-black bottom-0 left-0 z-10 flex items-end md:items-center px-10 pt-20 ">
          <h3 className="text-sm md:text-xl text-gray-200 font-medium mb-4 md:mb-0">
            {truncateString(data.title || data.name || data.original_title, 25)}
          </h3>
        </div>
      </div>

      <div
        className={`flex items-center justify-center absolute -top-5 -right-4 w-8 h-8 md:w-10 md:h-10 bg-slate-800 rounded-full border-2 border-dashed z-20 ${vote}`}
      >
        <span className=" text-xs md:text-sm">{voteDot}</span>
      </div>
    </motion.div>
  );
};

export default Card;

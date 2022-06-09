import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsPlayFill, BsListTask } from "react-icons/bs";
import { GoQuote } from "react-icons/go";
import { motion } from "framer-motion";
import CastSlide from "./CastSlide";
import { useSession } from "next-auth/react";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
const Details = ({ data, casts, prevPage, type }) => {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
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
  const stragger = {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const addToList = async () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    const show = {
      id: data.id,
      name: data.title || data.name || data.original_title,
      poster_path: `https://image.tmdb.org/t/p/w500${data?.poster_path}`,
      backdrop_path: `https://image.tmdb.org/t/p/original${data?.backdrop_path}`,
      mediaType: type === "movie" ? type + "s" : type,
      vote_average: data.vote_average,
    };
    const docRef = doc(db, "list", session.user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.data()) {
      await updateDoc(doc(db, "list", session.user.email), {
        savedShow: arrayUnion({
          ...show,
        }),
      });
    } else {
      await setDoc(docRef, {
        savedShow: arrayUnion({
          ...show,
        }),
      });
    }
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20 xl:py-0  flex flex-col items-center justify-center  w-full z-[99]"
    >
      <div className="fixed h-full top-0 w-full blur-[2px]">
        <div className="absolute w-full h-full top-0 left-0 bg-black/70 z-10"></div>
        {data.backdrop_path && (
          <Image
            priority
            src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
            layout="fill"
            objectFit="cover"
            className="h-full w-full"
          />
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 justify-items-center  px-5 xl:px-0  gap-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-[200px] h-[400px] md:w-[400px] md:h-[600px]  rounded-lg shadow-xl border border-gray-700"
        >
          {data.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
              alt=""
              layout="fill"
              objectFit="cover"
              className={
                loading
                  ? "grayscale blur-2xl scale-110 animate-pulse bg-slate-600 overflow-hidden"
                  : "grayscale-0 blur-0 scale-100 bg-transparent"
              }
              onLoadingComplete={() => setLoading(false)}
            />
          )}
          <button
            onClick={() =>
              !prevPage
                ? router.push("/", undefined, { scroll: false })
                : router.back()
            }
            className="absolute -top-10 border-b md:text-lg hover:opacity-70 transition duration-300"
          >
            Back To Browse
          </button>
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={stragger}
          className="relative text-center xl:text-left"
        >
          <motion.h1
            variants={fadeInUp}
            className={`text-xl md:text-3xl font-bold md:leading-[3rem]  flex flex-col lg:flex-row items-center justify-center xl:justify-start gap-2 mb-2`}
          >
            {data?.title || data?.name || data?.original_title}
            <span className="text-sm md:text-3xl opacity-70">
              (
              {data?.release_date
                ? data?.release_date.split("-")[0]
                : data?.first_air_date
                ? data?.first_air_date.split("-")[0]
                : ""}
              )
            </span>
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-5 mb-10 text-lg justify-center xl:justify-start"
          >
            <div className="space-x-1">
              {data?.genres.map((gen, idx) => (
                <span key={gen.id} className="text-[16px]">
                  {gen?.name}

                  {data?.genres.length - 1 !== idx && ","}
                </span>
              ))}
            </div>
            <div className="text-[16px] flex items-center gap-2">
              <div className="bg-white bg-opacity-80 w-[6px] h-[6px] rounded-full" />
              <p>{Math.floor(data?.runtime / 60 || "1")}h</p>
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center xl:justify-start gap-5 mb-10"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 bg-slate-800 bg-opacity-30  border border-dashed z-20 ${vote}`}
            >
              <span className="text-sm">{voteDot}</span>
            </div>

            <button className="flex items-center gap-1 hover:opacity-60 transition duration-300 ">
              <BsPlayFill className="w-5 h-5" /> Play Trailer
            </button>
            <button
              onClick={addToList}
              className="flex items-center gap-1 hover:opacity-60 transition duration-300 "
            >
              <BsListTask className="w-5 h-5" /> Add To List
            </button>
          </motion.div>
          {data?.tagline && (
            <motion.blockquote
              variants={fadeInUp}
              className="italic text-gray-300 font-medium flex gap-1 justify-center xl:justify-start"
            >
              <GoQuote className="w-3 h-3" />
              {data.tagline}
            </motion.blockquote>
          )}
          <motion.div variants={fadeInUp}>
            <span className="text-sm md:text-xl font-bold mt-5 mb-2 block">
              Overview :
            </span>
            <p className="text-sm md:text-lg leading-8 text-gray-300 px-5 md:px-0">
              {data?.overview}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="">
            <CastSlide casts={casts} />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Details;

import { useState } from "react";
import Image from "next/image";
import truncateString from "../helpers/truncateString";
import { useRouter } from "next/router";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../firebase";

const SlideCard = ({ data, list }) => {
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

  const removeFromList = async () => {
    const docRef = doc(db, "list", session.user.email);

    await updateDoc(docRef, {
      savedShow: arrayRemove(data),
    });
  };
  return (
    <div className="relative  w-fit">
      <div
        onClick={() =>
          router.push(
            list
              ? `${data.mediaType}/${data.id}`
              : data?.media_type == "tv"
              ? `/tv/${data?.id}`
              : `/movies/${data?.id}`,
            undefined,
            { scroll: false }
          )
        }
        className={
          list
            ? `relative w-[300px] h-[200px] sm:w-[400px] overflow-hidden rounded-lg shadow-xl group cursor-pointer`
            : `relative  w-[400px] h-[200px] md:w-[500px] md:h-[300px] xl:w-[800px] xl:h-[300px] overflow-hidden rounded-lg shadow-xl group cursor-pointer`
        }
      >
        <div className="absolute left-0 top-0 w-full h-full group-hover:bg-black/50 transition duration-500 z-20 flex items-center justify-center">
          <button className="opacity-0 group-hover:opacity-100 bg-green-600 hover:bg-indigo-100 hover:text-black py-2 px-6 md:px-12 rounded-md transition duration-500">
            View Details
          </button>
        </div>

        <Image
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          alt=""
          layout="fill"
          objectFit="cover"
          className={
            loading
              ? "grayscale blur-2xl scale-110 animate-pulse bg-slate-800"
              : "grayscale-0 blur-0 scale-100 bg-transparent"
          }
          onLoadingComplete={() => setLoading(false)}
        />

        <div className="absolute w-full h-32 bg-gradient-to-t from-black bottom-0 left-0 z-10 flex items-center px-10  ">
          <h3 className="text-xl md:text-2xl text-gray-200 font-medium">
            {truncateString(
              data?.title ||
                data?.original_title ||
                data?.original_name ||
                data?.name,
              25
            )}
          </h3>
        </div>
      </div>

      <div
        className={`flex items-center justify-center absolute -right-4 text-sm ${
          list
            ? "bg-red-600 p-1 rounded-sm hover:bg-red-700 transition duration-300 -top-7 z-20 "
            : "w-10 h-10 bg-slate-900 rounded-full border-2 border-dashed -top-5 z-30"
        } ${vote}`}
      >
        {list ? (
          <button onClick={removeFromList}>Remove</button>
        ) : (
          <span>{voteDot}</span>
        )}
      </div>
    </div>
  );
};

export default SlideCard;

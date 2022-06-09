import { useState } from "react";
import Image from "next/image";
const CastSlide = ({ casts }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-80 sm:w-[550px] lg:w-[650px] scrollbar-thin scrollbar-thumb-zinc-900 flex items-center gap-2 md:gap-6  pb-5 scrollbar-track-gray-300 mt-10 mx-auto ">
      {casts?.map((cast) => {
        if (!cast.profile_path) return;
        return (
          <div className="" key={cast.id}>
            <div className="relative w-14 h-14 md:w-20 md:h-20 mx-auto rounded-lg overflow-hidden shadow-xl">
              <Image
                src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                layout="fill"
                objectFit="cover"
                className={
                  loading
                    ? "grayscale blur-2xl scale-110 animate-pulse bg-slate-900"
                    : "grayscale-0 blur-0 scale-100 bg-transparent"
                }
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
            <h3 className="text-center mt-1 text-sm opacity-80 truncate">
              {cast.name}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default CastSlide;

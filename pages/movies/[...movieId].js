import Details from "../../components/Details";

import Head from "next/head";
import { motion } from "framer-motion";
import { getSession } from "next-auth/react";
const MovieDetail = ({ movie, casts, prevPage }) => {
  return (
    <>
      <Head>
        <title>
          {movie?.title || movie?.name || movie?.original_title} (
          {movie?.release_date.split("-")[0]}) - Cinematic
        </title>
      </Head>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Details data={movie} casts={casts} prevPage={prevPage} type="movie" />
      </motion.section>
    </>
  );
};

export default MovieDetail;

export async function getServerSideProps(context) {
  const { movieId } = context.params;
  const fetctMovie = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId[0]}?api_key=${process.env.TMDB_API}&language=en-US`
  );
  const movieData = await fetctMovie.json();
  const session = await getSession(context);
  const fetchCast = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId[0]}/credits?api_key=${process.env.TMDB_API}&language=en-US`
  );

  const castData = await fetchCast.json();
  if (!movieData.status) {
    return {
      redirect: {
        permanent: false,
        destination: "/movies",
      },
    };
  }
  return {
    props: {
      movie: movieData,
      casts: castData.cast,
      prevPage: context.req.headers.referer ? true : false,
      session,
    },
  };
}

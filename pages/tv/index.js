import React from "react";
import Container from "../../components/Container";
import Pagination from "../../components/Pagination";
import SearchInput from "../../components/SearchInput";
import Head from "next/head";
import { motion } from "framer-motion";
import { getSession } from "next-auth/react";
const MoviesPage = ({ tv }) => {
  return (
    <>
      <Head>
        <title>Tv Shows - Cinematic</title>
      </Head>
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className=""
      >
        <SearchInput route="tv" />
        <div className="bg-slate-900 py-20">
          <Pagination />
          <Container movies={tv.results} route="tv" />
        </div>
      </motion.div>
    </>
  );
};

export default MoviesPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { page } = context.query;
  const resp = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API}&language=en-US&page=${page}`
  );
  const data = await resp.json();

  if (!data.results || data?.results?.length <= 0) {
    return {
      redirect: {
        destination: "/tv?page='1'",
        permanent: false,
      },
    };
  }
  return {
    props: {
      tv: data,
      session,
    },
  };
}

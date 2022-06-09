import React from "react";
import Container from "../../../components/Container";
import { useRouter } from "next/router";
import Pagination from "../../../components/Pagination";
import SearchInput from "../../../components/SearchInput";
import Head from "next/head";

const find = ({ movies }) => {
  return (
    <>
      <Head>
        <title>Search and Browse Movies - Cinematic</title>
      </Head>
      <div className="">
        <SearchInput route="movies" />
        <div className="bg-slate-900 py-20">
          <Pagination count={movies.total_pages} />
          {movies?.results.length > 0 && (
            <Container movies={movies.results} route="movies" />
          )}
        </div>
      </div>
    </>
  );
};

export default find;

export async function getServerSideProps(contex) {
  const { page, query, findId } = contex.query;
  const resp = await fetch(
    `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.TMDB_API}&query=${findId}&language=en-US&page=${page}`
  );
  const data = await resp.json();

  if (!findId || !data?.results || data?.results?.length <= 0) {
    return {
      redirect: {
        destination: "/movies?page='2'",
        permanent: false,
      },
    };
  }
  return {
    props: {
      movies: data,
    },
  };
}

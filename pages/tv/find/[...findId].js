import React from "react";
import Container from "../../../components/Container";
import Pagination from "../../../components/Pagination";
import SearchInput from "../../../components/SearchInput";
import Head from "next/head";

const find = ({ tv }) => {
  return (
    <>
      <Head>
        <title>Search and Browse Tv Show - Cinematic</title>
      </Head>
      <div className="">
        <SearchInput route="tv" />
        <div className="bg-slate-900 py-20">
          <Pagination count={tv.total_pages} />
          {tv?.results.length > 0 && (
            <Container movies={tv.results} route="tv" />
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
    `https://api.themoviedb.org/3/search/tv/?api_key=${process.env.TMDB_API}&query=${findId}&language=en-US&page=${page}`
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
      tv: data,
    },
  };
}

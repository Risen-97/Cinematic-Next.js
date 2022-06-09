import Details from "../../components/Details";
import Head from "next/head";
import { getSession } from "next-auth/react";

const TvshowDetails = ({ tvShow, casts }) => {
  return (
    <>
      <Head>
        <title>
          {tvShow?.title || tvShow?.name || tvShow?.original_title} (
          {tvShow?.release_date
            ? tvShow?.release_date.split("-")[0]
            : tvShow.first_air_date
            ? tvShow.first_air_date.split("-")[0]
            : ""}{" "}
          - Cinematic
        </title>
      </Head>

      <section className="">
        <Details data={tvShow} casts={casts} type="tv" />
      </section>
    </>
  );
};

export default TvshowDetails;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { tvId } = context.params;
  const fetchTv = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId[0]}?api_key=${process.env.TMDB_API}&language=en-US`
  );
  const tvData = await fetchTv.json();

  const fetchCast = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId[0]}/credits?api_key=${process.env.TMDB_API}&language=en-US`
  );

  const castData = await fetchCast.json();

  if (!tvData.status) {
    return {
      redirect: {
        permanent: false,
        destination: "/tv",
      },
    };
  }
  return {
    props: {
      tvShow: tvData,
      casts: castData.cast,
      session,
    },
  };
}

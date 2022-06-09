import Head from "next/head";
import Banner from "../components/Banner";
import Container from "../components/Container";
import SlideMovies from "../components/SlideMovies";
import { motion } from "framer-motion";
import { useSession, getSession } from "next-auth/react";
import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Home({ bannerMovie, popularMovies, trending }) {
  const { data: session } = useSession();

  const userLists = async () => {
    const docRef = doc(db, "list", session.user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.data()) {
      return;
    }

    await setDoc(docRef, {
      savedShow: [],
    });
  };
  useEffect(() => {
    if (session) {
      userLists();
    }
  }, []);
  return (
    <>
      <Head>
        <title>Cinematic</title>
      </Head>
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className=""
      >
        <Banner movie={bannerMovie} />
        <SlideMovies movies={trending} />
        <Container movies={popularMovies} route="movies" />
      </motion.div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const popular = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API}&language=en-US&page=1`
  );
  const trending = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_API}`
  );
  const popularData = await popular.json();
  const trendingData = await trending.json();

  const randomMovie = Math.floor(Math.random() * popularData.results.length);

  return {
    props: {
      bannerMovie: popularData.results[5],
      popularMovies: popularData.results,
      trending: trendingData.results,
      session,
    },
  };
}

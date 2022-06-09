import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSession, useSession } from "next-auth/react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import SlideCard from "../../components/SlideCard";
import Head from "next/head";
const MyList = ({}) => {
  const { data: session } = useSession();
  const [lists, setlists] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!session) {
      return;
    }
    const unsubscribe = onSnapshot(
      doc(db, "list", session.user.email),
      (snapshot) => {
        setlists(snapshot.data()?.savedShow);
        if (snapshot.data()?.savedShow.length > 0) setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (!session) {
    return (
      <>
        <Head>
          <title>My List - Cinematic</title>
        </Head>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex items-center justify-center"
        >
          <h1 className="text-3xl">Sorry You Are Not Logged In</h1>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>My List - Cinematic</title>
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-8"
      >
        <h2 className="text-2xl uppercase text-slate-500 mb-5">My List</h2>

        {lists && (
          <div className="flex items-center justify-center xl:justify-start gap-10 flex-wrap">
            {lists.map((list) => {
              return <SlideCard key={list.id} data={list} list />;
            })}
          </div>
        )}

        {lists.length === 0 && !loading && (
          <h1 className="text-3xl text-center">Your List is Empty</h1>
        )}
        {loading && <h1 className="text-3xl text-center">Loading...</h1>}
      </motion.div>
    </>
  );
};

export default MyList;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

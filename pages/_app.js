import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <SessionProvider session={session}>
        <Navbar />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.pathname} />
        </AnimatePresence>
      </SessionProvider>
    </>
  );
}

export default MyApp;

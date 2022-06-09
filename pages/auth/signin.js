import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import {
  getProviders,
  getSession,
  signIn as SignIntoProvider,
} from "next-auth/react";
import { motion } from "framer-motion";
const signin = ({ providers }) => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[calc(100vh_-_64px)] flex justify-center"
    >
      <div className="fixed w-full h-full blur-[2px]">
        <div className="absolute w-full h-full z-10 bg-black/60"></div>
        <Image
          priority
          src="/assets/postersBg.jpg"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute w-full h-96 z-10 bottom-0 bg-gradient-to-t from-black"></div>
      </div>
      <div className="relative flex items-center">
        <div className="bg-slate-900 py-2 px-4 w-72 md:w-96 rounded-md overflow-hidden text-sm md:text-[16px]">
          {Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() =>
                SignIntoProvider(provider.id, { callbackUrl: "/" })
              }
              className="w-full bg-blue-600 group hover:bg-blue-800 transition duration-300 border border-l-0 border-blue-600 hover:border-blue-800 rounded-sm my-2 flex items-center"
            >
              <div className="bg-gray-200 group-hover:bg-gray-300 transition duration-300 py-2 w-12 flex items-center justify-center">
                <FcGoogle className="w-5 h-5" />
              </div>
              <span className="flex-1">Sign In With {provider.name}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default signin;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      providers,
    },
  };
}

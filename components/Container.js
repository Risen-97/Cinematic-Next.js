import React from "react";
import Card from "./Card";
import { motion } from "framer-motion";
const Container = ({ movies, route }) => {
  const stragger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <motion.section
      exit={{ opacity: 0 }}
      initial="initial"
      animate="animate"
      variants={stragger}
      className="py-20 px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:flex flex-wrap items-center justify-center justify-items-center  gap-10"
    >
      {movies.length > 0 &&
        movies.map((movie) => {
          return <Card key={movie.id} data={movie} route={route} />;
        })}
    </motion.section>
  );
};

export default Container;

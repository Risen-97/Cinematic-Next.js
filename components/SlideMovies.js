import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideCard from "./SlideCard";

const SlideMovies = ({ movies }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="relative px-20 overflow-hidden">
      <div className="bg-gradient-to-r left-0 arrowShadow md:w-40"></div>
      <div className="arrowShadow bg-gradient-to-l right-0   md:w-44 "></div>

      {/* <h2> Single Item</h2> */}
      <Slider {...settings}>
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="pt-10">
              <SlideCard data={movie} />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SlideMovies;

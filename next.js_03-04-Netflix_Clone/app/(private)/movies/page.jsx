import { getMovies } from "@/helpers/movieFunctions";
import React from "react";
import HeroSection from "./components/HeroSection";
import MovieSection from "./components/MovieSection";

export const metadata = {
  title: "Movies",
  description: "This is movie page",
};

const Movies = async () => {
  const movies = await getMovies("now_playing");

  return (
    <div>
      <HeroSection
        id={movies[0]?.id}
        title={movies[0]?.title}
        overview={movies[0].overview}
      />
      <div className="px-4 md:px-12 mt-4">
        <MovieSection title="NOW PLAYING" type={"now_playing"} />
        <MovieSection title="POPULAR" type={"popular"} />
        <MovieSection title="TOP RATED" type={"top_rated"} />
        <MovieSection title="UPCOMING" type={"upcoming"} />
      </div>
    </div>
  );
};

export default Movies;

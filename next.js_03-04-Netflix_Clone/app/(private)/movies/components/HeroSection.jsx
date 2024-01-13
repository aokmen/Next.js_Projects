import { getVideoKeys } from "@/helpers/movieFunctions";
import React from "react";
import VideoSection from "./VideoSection";
import Link from "next/link";
import { PlayIcon } from "@heroicons/react/24/solid";

const HeroSection = async ({ id, title, overview }) => {
  const videoKey = await getVideoKeys(id);
  //   console.log(data);
  return (
    <div className="relative h-[50vw]">
      <VideoSection videoKey={videoKey} />
      <div className="absolute top-[30%] ml-4 md:ml-6">
        <p className="text-white text-xl md:text-5xl h-full md:w-[50%] lg:text-6xl font-bold drop-shadow-lg">
          {title}
        </p>
        <p className="text-white text-[8px] md:text-lg md:mt-8 h-full w-[90%]  md:w-[80%] lg:w-[50%]  drop-shadow-lg">
          {overview}
        </p>
        <div className="flex items-center mt-3 md:mt-8 gap-3 ">
          <Link
            href={`/movies/${id}`}
            className="bg-white rounded-md py-1 md:py-2 md:px-4 w-auto text-sm lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300   "
          >
            <PlayIcon className="w-4 md:w-7 text-black mr-1" />
            Play
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

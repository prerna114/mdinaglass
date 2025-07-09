"use client";

import { useState, useRef, useEffect } from "react";

const Video = () => {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: "video",
      src: "/videos/hero-vdo.mp4",
    },
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const current = slides[currentSlide];

  useEffect(() => {
    videoRef.current.play();

    setIsVideoPlaying(true);
  }, []);
  return (
    <div
      className="position-relative text-center"
      onMouseEnter={() => {
        console.log("hovered");
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        console.log("hovered out");
      }}
    >
      {current.type === "video" ? (
        <video
          ref={videoRef}
          className="w-100 video-class"
          style={{ maxHeight: "717px", objectFit: "cover" }}
          src={current.src}
          muted
          loop
          playsInline
        />
      ) : (
        <img
          src={current.src}
          className="w-100"
          style={{ maxHeight: "500px", objectFit: "cover" }}
          alt="Carousel Slide"
        />
      )}

      {/* Play/Pause Button for Video */}
      {/* {current.type === "video" && (
        <button
          className="btn btn-primary position-absolute top-50 start-50 translate-middle"
          style={{
            borderRadius: "50%",
            width: "95px",
            height: "95px",
            fontSize: "1.5rem",
            backgroundColor: "#005E84",
            display: !isVideoPlaying ? "block" : isHovered ? "block" : "none",
          }}
          onClick={togglePlay}
        >
          {!isVideoPlaying ? (
            <FaPlay
              style={{
                width: "34px",
                height: "50px",
                color: "#fff",
                marginLeft: "10px",
              }}
            />
          ) : (
            <FaPause
              style={{
                width: "34px",
                height: "50px",
                color: "#fff",
                // marginLeft: "10px",
              }}
            />
          )}
        </button>
      )} */}

      {/* Carousel Navigation */}
      {/* <button
          className="btn btn-light position-absolute top-50 start-0 translate-middle-y"
          style={{ zIndex: 10 }}
          onClick={handlePrev}
        >
          <FaChevronLeft />
        </button> */}
      {/* <button
          className="btn btn-light position-absolute top-50 end-0 translate-middle-y"
          style={{ zIndex: 10 }}
          onClick={handleNext}
        >
          <FaChevronRight />
        </button> */}
    </div>
  );
};

export default Video;

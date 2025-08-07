import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
function SimpleSlider({ images }) {
  const settings = {
    dots: true,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1700,
  };

  console.log("Images in slider", images);
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image.src}
              alt={`Slide ${index + 1}`}
              className="mb-3 footer-logo"
              style={{ width: "100%!important", height: "430px !important" }}
              width={1130}
              height={430}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SimpleSlider;

import React from "react";
import Slider from "react-slick";
import "./ImageSlider.css";

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    customPaging: (i) => <div className="custom-dot"></div>,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className="slider-item">
          <img src={image.url} alt={image.altText} className="slider-image" />
          <div className="slider-text">
            <p dangerouslySetInnerHTML={{ __html: image.text }}></p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;

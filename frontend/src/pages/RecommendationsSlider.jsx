import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../styles.css';

const RecommendationsSlider = ({ recommendations }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
      {recommendations.map((rec, index) => (
        <div key={index} className="recommendation-slide">
          <h3>{rec.emoji} {rec.title}</h3>
          <p>{rec.detail}</p>
          {rec.image && <img src={rec.image} alt={rec.title} className="rec-image" />}
        </div>
      ))}
    </Slider>
  );
};

export default RecommendationsSlider;

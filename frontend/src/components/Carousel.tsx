import React, { useState } from 'react';

interface CarouselProps {
  items: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="carousel">
      <button onClick={prev}>Prev</button>
      <div className="carousel-item">
        {items[currentIndex]}
      </div>
      <button onClick={next}>Next</button>
    </div>
  );
};

export default Carousel;

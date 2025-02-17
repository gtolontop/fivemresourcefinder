import React, { useEffect, useState, useRef } from "react";

interface Card {
  title: string;
  description: string;
  buttonText: string;
  theme: "theme1" | "theme2";
}

interface SlideData {
  cards: Card[];
}

const slidesData: SlideData[] = [
  {
    cards: [
      {
        title: "Spotlight Slot 1",
        description:
          "Promote your resource here for maximum visibility and reach. Perfect for creators looking to stand out!",
        buttonText: "Buy Me",
        theme: "theme1",
      },
      {
        title: "Spotlight Slot 2",
        description:
          "Promote your resource here for maximum visibility and reach. Perfect for creators looking to stand out!",
        buttonText: "Buy Me",
        theme: "theme2",
      },
    ],
  },
  {
    cards: [
      {
        title: "Spotlight Slot 3",
        description:
          "Promote your resource here for maximum visibility and reach. Perfect for creators looking to stand out!",
        buttonText: "Buy Me",
        theme: "theme1",
      },
      {
        title: "Spotlight Slot 4",
        description:
          "Promote your resource here for maximum visibility and reach. Perfect for creators looking to stand out!",
        buttonText: "Buy Me",
        theme: "theme2",
      },
    ],
  },
  {
    cards: [
      {
        title: "Spotlight Slot 5",
        description:
          "Promote your resource here for maximum visibility and reach. Perfect for creators looking to stand out!",
        buttonText: "Buy Me",
        theme: "theme1",
      },
      {
        title: "Spotlight Slot 6",
        description:
          "Promote your resource here for maximum visibility and reach. Perfect for creators looking to stand out!",
        buttonText: "Buy Me",
        theme: "theme2",
      },
    ],
  },
  {
    cards: [
      {
        title: "Spotlight Slot 7",
        description:
          "Promote your resource here for maximum visibility and reach. Perfect for creators looking to stand out!",
        buttonText: "Buy Me",
        theme: "theme1",
      },
      {
        title: "Spotlight Slot 8",
        description:
          "Promote your resource here for maximum visibility and reach. Perfect for creators looking to stand out!",
        buttonText: "Buy Me",
        theme: "theme2",
      },
    ],
  },
  {
    cards: [
      {
        title: "Spotlight Slot 9",
        description:
          "Promote your resource here for maximum visibility and reach. Perfect for creators looking to stand out!",
        buttonText: "Buy Me",
        theme: "theme1",
      },
      {
        title: "Spotlight Slot 10",
        description:
          "Promote your resource here for maximum visibility and reach. Perfect for creators looking to stand out!",
        buttonText: "Buy Me",
        theme: "theme2",
      },
    ],
  },
];

const SpotlightSection: React.FC = () => {
  const [slidesPerView] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const maxIndex = Math.max(slidesData.length - slidesPerView, 0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, maxIndex]);

  const paginationCount = maxIndex + 1;

  return (
    <section className="spotlight-section">
      <div className="container">
        {/* Titre principal et description */}
        <div className="spotlight-header">
          <h2 className="spotlight-title">Creator Spotlight</h2>
          <p className="spotlight-description">
            Showcase your resource to a broader audience! This space is
            dedicated to highlighting your work right on our website's front
            page.
          </p>
        </div>

        {/* Slider */}
        <div className="spotlight-slider">
          <div
            className="spotlight-slider-wrapper"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / slidesPerView)
              }%)`,
            }}
          >
            {slidesData.map((slide, index) => (
              <div
                className="spotlight-slide"
                key={index}
                style={{ flex: `0 0 ${100 / slidesPerView}%` }}
              >
                <div className="slide-content">
                  <div className="slide-right">
                    {slide.cards.map((card, cardIndex) =>
                      card.theme === "theme1" ? (
                        <div className="spotlight-card" key={cardIndex}>
                          <div className="spotlight-image" />
                          <div className="spotlight-content">
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                            <button className="spotlight-button">
                              {card.buttonText}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="spotlight-card" key={cardIndex}>
                          <div className="spotlight-content">
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                            <button className="spotlight-button">
                              {card.buttonText}
                            </button>
                          </div>
                          <div className="spotlight-image" />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Boutons de navigation */}
          <button className="swiper-button-prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="swiper-button-next" onClick={nextSlide}>
            &#10095;
          </button>

          {/* Pagination */}
          <div className="swiper-pagination">
            {Array.from({ length: paginationCount }).map((_, index) => (
              <span
                key={index}
                className={`swiper-pagination-bullet ${
                  index === currentIndex
                    ? "swiper-pagination-bullet-active"
                    : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;

import React, { useEffect, useState, useRef } from 'react';

interface Slide {
  title: string;
  description: string;
  buttonText: string;
}

const slidesData: Slide[] = [
  {
    title: 'Spotlight Slot 1',
    description:
      'Promote your resource here for maximum visibility and reach. Perfect for creators looking to stand out!',
    buttonText: 'Buy Me',
  },
  {
    title: 'Spotlight Slot 2',
    description:
      'Promote your resource here for maximum visibility and reach. Perfect for creators looking to stand out!',
    buttonText: 'Buy Me',
  },
  {
    title: 'Spotlight Slot 3',
    description:
      'Promote your resource here for maximum visibility and reach. Perfect for creators looking to stand out!',
    buttonText: 'Buy Me',
  },
  {
    title: 'Spotlight Slot 4',
    description:
      'Promote your resource here for maximum visibility and reach. Perfect for creators looking to stand out!',
    buttonText: 'Buy Me',
  },
];

const SpotlightSection: React.FC = () => {
  // currentIndex correspond à l'index du groupe de slides affiché
  const [currentIndex, setCurrentIndex] = useState(0);
  // Affiche 2 slides à partir de 768px de largeur, sinon 1
  const [slidesPerView, setSlidesPerView] = useState(
    window.innerWidth >= 768 ? 2 : 1
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Met à jour le nombre de slides par vue en fonction de la taille de l'écran
  const updateSlidesPerView = () => {
    const newSlidesPerView = window.innerWidth >= 768 ? 2 : 1;
    setSlidesPerView(newSlidesPerView);
    setCurrentIndex(0); // On réinitialise l'index lors du changement de vue
  };

  useEffect(() => {
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  // Calcul de l'index maximum (pour les groupes de slides)
  const maxIndex = Math.max(slidesData.length - slidesPerView, 0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
  };

  // Autoplay toutes les 3 secondes
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, slidesPerView, maxIndex]);

  // Le nombre de bullets correspond au nombre de groupes (maxIndex + 1)
  const paginationCount = maxIndex + 1;

  return (
    <section className="spotlight-section">
      <div className="container">
        <h2 className="spotlight-title">Creator Spotlight</h2>
        <p className="spotlight-description">
          Showcase your resource to a broader audience! This space is dedicated
          to highlighting your work right on our website's front page.
        </p>

        <div className="spotlight-slider">
          {/* Wrapper contenant l'ensemble des slides */}
          <div
            className="spotlight-slider-wrapper"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
            }}
          >
            {slidesData.map((slide, index) => (
              <div
                className="spotlight-slide"
                key={index}
                // Chaque slide occupe 100/slidesPerView % de la largeur du conteneur
                style={{ flex: `0 0 ${100 / slidesPerView}%` }}
              >
                <div className="spotlight-card">
                  <div className="spotlight-image"></div>
                  <div className="spotlight-content">
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                    <button className="spotlight-button">
                      {slide.buttonText}
                    </button>
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

          {/* Bullets de pagination */}
          <div className="swiper-pagination">
            {Array.from({ length: paginationCount }).map((_, index) => (
              <span
                key={index}
                className={`swiper-pagination-bullet ${
                  index === currentIndex ? 'swiper-pagination-bullet-active' : ''
                }`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;

import React from 'react';

interface ReviewCardProps {
  image: string;
  name: string;
  handle: string;
  rating: number;
  review: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ image, name, handle, rating, review }) => {
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  return (
    <div className="review-card">
      <img src={image} alt={name} className="review-image" />
      <h4>{name} <span>{handle}</span></h4>
      <div className="review-rating">{stars} <span>({rating})</span></div>
      <p>{review}</p>
    </div>
  );
};

export default ReviewCard;

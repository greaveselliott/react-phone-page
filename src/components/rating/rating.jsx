import React from 'react'
import PropTypes from 'prop-types';
import './rating.scss';

const Rating = ({rating}) => (
    <div className="rating">
        <span className={`rating__star ${rating > 1 && 'rating__star--active'}`}>{rating > 1 ? '★' : '☆'}</span>
        <span className={`rating__star ${rating > 2 && 'rating__star--active'}`}>{rating > 2 ? '★' : '☆'}</span>
        <span className={`rating__star ${rating > 3 && 'rating__star--active'}`}>{rating > 3 ? '★' : '☆'}</span>
        <span className={`rating__star ${rating > 4 && 'rating__star--active'}`}>{rating > 4 ? '★' : '☆'}</span>
        <span className={`rating__star ${rating === 5 && 'rating__star--active'}`}>{rating === 5 ? '★' : '☆'}</span>
    </div>
);

Rating.propTypes = {
    rating: PropTypes.string
}

export default Rating;
import React, { useState } from 'react';
import Hero from './Hero';
import Overview from './Overview';
import Instructors from './Instructors';
import ReviewForm from './AddReview';
import NewsLater from './NewsLater';
import ReviewList from './ReviewList'; 

const CourseDetail = () => {
    
    const [reviews, setReviews] = useState([]); // 1. Create state for all reviews

    const handleAddReview = (newReview) => {
        setReviews((prevReviews) => [...prevReviews, newReview]);
    };

    return (
        <>
            <Hero />
            <Overview />
            <Instructors />
            {/* 2. Pass reviews as prop to ReviewList */}
            <ReviewList reviews={reviews} />
            {/* 3. Pass handleAddReview to ReviewForm */}
            <ReviewForm onAddReview={handleAddReview} />
            <NewsLater />
        </>
    );
};

export default CourseDetail;

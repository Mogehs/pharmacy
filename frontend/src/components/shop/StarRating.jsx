const StarRating = ({ rating }) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2; // round to nearest 0.5

    for (let i = 1; i <= 5; i++) {
        if (i <= roundedRating) {
            stars.push(<span key={i}>⭐</span>);
        } else if (i - 0.5 === roundedRating) {
            stars.push(<span key={i}>⭐<span className="opacity-50">½</span></span>);
        } else {
            stars.push(<span key={i} className="opacity-30">⭐</span>);
        }
    }

    return <div className="flex">{stars}</div>;
};


export default StarRating;
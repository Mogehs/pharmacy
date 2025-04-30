import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function ReviewList({ reviews }) {
  return (
    <div className="max-w-9xl  bg- py-15 px-4 md:px-10 xl:px-35">
      <div className="flex max-md:flex-wrap items-center justify-between mb-8">
        <h2 className="max-md:text-4xl text-5xl font-bold text-[#00B8A9]">
          Customer Reviews
        </h2>
        <span className="text-lg text-[#00B8A9] font-semibold">{reviews.length} Reviews</span>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center text-gray-500 py-20 text-xl font-semibold">
          No reviews yet. Be the first to write one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-xl p-6 bg-white shadow hover:shadow-lg transition duration-300 ease-in-out flex flex-col justify-between"
            >
              <div className="mb-4 flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-orange-400 text-xl">
                    {star <= review.rating ? <AiFillStar /> : <AiOutlineStar />}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl font-semibold text-[#00B8A9] mb-2">
                {review.title}
              </h3>
              <p className="text-gray-700 mb-6">{review.summary}</p>

              <div className="text-sm text-gray-500 mt-auto">
                <div>- {review.name}</div>
                <div className="text-xs text-[#00B8A9]">{review.email} | {review.website}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Info, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function ReviewsPage() {
  const { reviews, addReview } = useStore();
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !text.trim()) {
      setError('Please enter your name and your review comment.');
      return;
    }
    setError(null);
    addReview(customerName, rating, text);
    setCustomerName('');
    setRating(5);
    setText('');
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="max-w-2xl mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6E141D] mb-2">
          Guest Voices
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2C1A15]">
          Customer Reviews
        </h1>
        <p className="text-sm sm:text-base text-[#5C453E] mt-2 leading-relaxed">
          Read feedback from guests and share your own dining or delivery experience
          with Bharath Delights.
        </p>
      </div>

      {/* Transparency Notice about Sample Reviews */}
      <div className="mb-8 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-[#F4ECE0] border border-[#E5D9C8] text-xs text-[#5C453E]">
        <Info className="w-4 h-4 text-[#6E141D] shrink-0 mt-0.5" />
        <p>
          <strong>Demonstration Transparency:</strong> Entries marked &ldquo;Sample
          Review&rdquo; are demonstration examples only and are not presented as
          verified customer purchases. New reviews you submit below are saved in your
          browser immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Submit Review Form */}
        <section className="lg:col-span-5 bg-white border border-[#E5D9C8] rounded-2xl p-6 sm:p-7">
          <h2 className="font-display text-2xl font-bold text-[#2C1A15] mb-1">
            Write a Review
          </h2>
          <p className="text-xs text-[#665048] mb-5">
            Share your thoughts on taste, freshness, and packaging.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="review-name"
                className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
              >
                Your Name <span className="text-[#9E1C20]">*</span>
              </label>
              <input
                id="review-name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8CBB8] bg-[#FCF8F1] text-sm focus:outline-none focus:border-[#6E141D]"
              />
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#2C1A15] mb-1.5">
                Your Rating
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} stars`}
                    className="p-1.5 rounded-md hover:bg-[#FCF8F1] transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'fill-[#D49B1A] text-[#D49B1A]'
                          : 'text-[#D8CBB8]'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-semibold text-[#5C453E] tabular-nums">
                  {rating} / 5
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="review-text"
                className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
              >
                Your Review <span className="text-[#9E1C20]">*</span>
              </label>
              <textarea
                id="review-text"
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Which dishes did you try and how was your experience?"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8CBB8] bg-[#FCF8F1] text-sm focus:outline-none focus:border-[#6E141D]"
              />
            </div>

            {error && <p className="text-xs text-[#9E1C20]">{error}</p>}
            {submitted && (
              <p className="text-xs font-semibold text-[#1B7A43]">
                Thank you! Your review has been added.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-5 rounded-lg bg-[#6E141D] text-[#FCF8F1] font-semibold text-sm hover:bg-[#520D14] transition-colors cursor-pointer"
            >
              Submit Review
            </button>
          </form>
        </section>

        {/* Reviews List */}
        <section className="lg:col-span-7 space-y-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-white border border-[#E5D9C8] rounded-xl p-6 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-4 h-4 ${
                        idx < review.rating
                          ? 'fill-[#D49B1A] text-[#D49B1A]'
                          : 'text-[#D8CBB8]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#665048]">
                  {review.isSample
                    ? 'Sample Review (Demo)'
                    : `Submitted ${review.date}`}
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#2C1A15] leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>

              <p className="text-sm font-semibold text-[#6E141D]">
                — {review.customerName}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FiX, FiStar, FiUser } from 'react-icons/fi';

function ReviewModal({ atm, isOpen, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && atm) {
      fetchReviews();
    }
  }, [isOpen, atm]);

  const fetchReviews = async () => {
    if (!atm) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${atm.id}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async () => {
    if (!user || !newReview.comment.trim()) return;

    setSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          atmId: atm.id,
          userId: user.id,
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      });

      if (response.ok) {
        setNewReview({ rating: 5, comment: '' });
        fetchReviews(); // Refresh reviews
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, onChange = null) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`star ${i < rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
        onClick={interactive ? () => onChange(i + 1) : undefined}
      />
    ));
  };

  if (!isOpen || !atm) return null;

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content review-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>

        <div className="modal-header">
          <h2>{atm.name} Reviews</h2>
          <div className="atm-rating-summary">
            <div className="stars">{renderStars(Math.round(averageRating))}</div>
            <span>{averageRating.toFixed(1)} ({reviews.length} reviews)</span>
          </div>
        </div>

        <div className="reviews-list">
          {loading ? (
            <div className="loading">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="no-reviews">No reviews yet. Be the first to review!</div>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="review-user">
                    <FiUser />
                    <span>Anonymous User</span>
                  </div>
                  <div className="review-stars">{renderStars(review.rating)}</div>
                </div>
                <p className="review-comment">{review.comment}</p>
                <small className="review-date">
                  {new Date(review.timestamp).toLocaleDateString()}
                </small>
              </div>
            ))
          )}
        </div>

        {user && (
          <div className="add-review">
            <h3>Add Your Review</h3>
            <div className="rating-input">
              <label>Rating:</label>
              <div className="stars">
                {renderStars(newReview.rating, true, (rating) =>
                  setNewReview({ ...newReview, rating })
                )}
              </div>
            </div>
            <textarea
              placeholder="Share your experience..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={3}
            />
            <button
              className="submit-review"
              onClick={submitReview}
              disabled={submitting || !newReview.comment.trim()}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        )}

        {!user && (
          <div className="login-prompt">
            <p>Please sign in to leave a review.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewModal;

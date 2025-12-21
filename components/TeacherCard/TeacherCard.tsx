"use client";

import { Teacher } from "@/types/teacher";

interface TeacherCardProps {
  teacher: Teacher & { id: string };
  isFavorite: boolean;
  isExpanded: boolean;
  onFavoriteToggle: (id: string) => void;
  onToggleExpanded: (id: string) => void;
}

export default function TeacherCard({
  teacher,
  isFavorite,
  isExpanded,
  onFavoriteToggle,
  onToggleExpanded,
}: TeacherCardProps) {
  return (
    <div className="teacher-card">
      <div className="teacher-card__content">
        {/* Avatar */}
        <div className="teacher-card__avatar-wrapper">
          <img
            src={teacher.avatar_url || "/default-avatar.png"}
            alt={`${teacher.name} ${teacher.surname}`}
            className="teacher-card__avatar"
          />
        </div>

        {/* Main Info */}
        <div className="teacher-card__info">
          {/* Header: Languages зліва, всі іконки справа */}
          <div className="teacher-card__header">
            <div className="teacher-card__header-left">
              <p className="teacher-card__label">Languages</p>
              <h2 className="teacher-card__name">
                {teacher.name} {teacher.surname}
              </h2>
            </div>

            <div className="teacher-card__header-right">
              {/* Lessons online */}
              <div className="teacher-card__lessons-online">
                <svg
                  className="teacher-card__info-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span>Lessons online</span>
              </div>

              {/* Lessons done */}
              <div className="teacher-card__info-item">
                <span className="teacher-card__lessons-done">
                  Lessons done: {teacher.lessons_done || 0}
                </span>
              </div>

              {/* Rating */}
              <div className="teacher-card__rating">
                <span className="teacher-card__star">⭐</span>
                <span>Rating: {teacher.rating || "N/A"}</span>
              </div>

              {/* Price */}
              <div className="teacher-card__info-item">
                <span>Price / 1 hour: </span>
                <span className="teacher-card__price">
                  {teacher.price_per_hour}$
                </span>
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => onFavoriteToggle(teacher.id)}
                className={`teacher-card__favorite ${
                  isFavorite ? "teacher-card__favorite--active" : ""
                }`}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <svg
                  className="teacher-card__favorite-icon"
                  fill={isFavorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="teacher-card__details">
            <p>
              <span className="teacher-card__label-inline">Speaks:</span>{" "}
              <span className="teacher-card__value">
                {teacher.languages?.join(", ") || "N/A"}
              </span>
            </p>
            <p>
              <span className="teacher-card__label-inline">Lesson Info:</span>{" "}
              {teacher.lesson_info}
            </p>
            <p>
              <span className="teacher-card__label-inline">Conditions:</span>{" "}
              {teacher.conditions?.join(" ") || "N/A"}
            </p>
          </div>

          {/* Levels Preview - показуємо завжди */}
          {teacher.levels && teacher.levels.length > 0 && (
            <div className="teacher-card__levels-preview">
              <div className="teacher-card__levels-list">
                {teacher.levels.map((level, idx) => (
                  <span key={idx} className="teacher-card__level-badge">
                    {level}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Read More Button */}
          <button
            onClick={() => onToggleExpanded(teacher.id)}
            className="teacher-card__read-more"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="teacher-card__expanded">
              <p className="teacher-card__experience">{teacher.experience}</p>

              {/* Reviews */}
              {teacher.reviews && teacher.reviews.length > 0 && (
                <div className="teacher-card__reviews">
                  <div className="teacher-card__reviews-list">
                    {teacher.reviews.map((review, idx) => (
                      <div key={idx} className="teacher-card__review">
                        <div className="teacher-card__review-header">
                          <div className="teacher-card__reviewer-avatar">
                            {review.reviewer_name?.[0]}
                          </div>
                          <div className="teacher-card__reviewer-info">
                            <p className="teacher-card__reviewer-name">
                              {review.reviewer_name}
                            </p>
                            <div className="teacher-card__review-rating">
                              <span className="teacher-card__star">⭐</span>
                              <span>{review.reviewer_rating}.0</span>
                            </div>
                          </div>
                        </div>
                        <p className="teacher-card__review-comment">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Book Trial Lesson Button */}
              <button className="teacher-card__book-btn">
                Book trial lesson
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

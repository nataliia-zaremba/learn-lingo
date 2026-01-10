"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getTeachers } from "@/lib/teachersApi";
import { Teacher } from "@/types/teacher";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import Modal from "@/components/Modal/Modal";
import BookingForm from "@/components/BookingForm/BookingForm";
import Toast from "@/components/Toast/Toast";
import "./teachers.css";

export default function TeachersPage() {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<(Teacher & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(4);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<
    (Teacher & { id: string }) | null
  >(null);

  // Завантаження favorites з localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteTeachers");
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Збереження favorites в localStorage
  useEffect(() => {
    if (favorites.size > 0) {
      localStorage.setItem(
        "favoriteTeachers",
        JSON.stringify(Array.from(favorites))
      );
    }
  }, [favorites]);

  // Початкове завантаження викладачів
  useEffect(() => {
    loadTeachers(4);
  }, []);

  const loadTeachers = async (limit: number) => {
    try {
      const data = await getTeachers(limit);
      setTeachers(data);
      setHasMore(data.length === limit);
    } catch (error) {
      console.error("Error loading teachers:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const newLimit = currentLimit + 4;
    setCurrentLimit(newLimit);
    await loadTeachers(newLimit);
  };

  const handleFavoriteToggle = (teacherId: string) => {
    if (!user) {
      setToastMessage(
        "Щоб додати викладача в обрані, потрібно увійти в систему!"
      );
      setShowToast(true);
      return;
    }

    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(teacherId)) {
        newFavorites.delete(teacherId);
      } else {
        newFavorites.add(teacherId);
      }
      return newFavorites;
    });
  };

  const toggleExpanded = (teacherId: string) => {
    setExpandedCards((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(teacherId)) {
        newExpanded.delete(teacherId);
      } else {
        newExpanded.add(teacherId);
      }
      return newExpanded;
    });
  };

  const handleBookLesson = (teacher: Teacher & { id: string }) => {
    setSelectedTeacher(teacher);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedTeacher(null);
  };

  if (loading) {
    return (
      <div className="teachers-loading">
        <p>Loading teachers...</p>
      </div>
    );
  }

  return (
    <>
      <section className="teachers-page">
        <h1 className="teachers-page__title">Our Teachers</h1>

        {teachers.length === 0 && (
          <p className="teachers-page__empty">No teachers found</p>
        )}

        <div className="teachers-grid">
          {teachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              isFavorite={favorites.has(teacher.id)}
              isExpanded={expandedCards.has(teacher.id)}
              onFavoriteToggle={handleFavoriteToggle}
              onToggleExpanded={toggleExpanded}
              onBookLesson={handleBookLesson}
            />
          ))}
        </div>

        {hasMore && teachers.length >= 4 && (
          <div className="teachers-page__load-more">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="teachers-page__load-more-btn"
            >
              {loadingMore ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </section>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type="warning"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Booking Modal */}
      {selectedTeacher && (
        <Modal
          isOpen={isBookingModalOpen}
          onClose={closeBookingModal}
          title="Book trial lesson"
        >
          <BookingForm teacher={selectedTeacher} onClose={closeBookingModal} />
        </Modal>
      )}
    </>
  );
}

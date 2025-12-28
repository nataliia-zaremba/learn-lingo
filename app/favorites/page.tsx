"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { getTeachers } from "@/lib/teachersApi";
import { Teacher } from "@/types/teacher";
import TeacherCard from "@/components/TeacherCard/TeacherCard";
import Modal from "@/components/Modal/Modal";
import BookingForm from "@/components/BookingForm/BookingForm";
import "../teachers/teachers.css";

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [allTeachers, setAllTeachers] = useState<(Teacher & { id: string })[]>(
    []
  );
  const [favoriteTeachers, setFavoriteTeachers] = useState<
    (Teacher & { id: string })[]
  >([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<
    (Teacher & { id: string }) | null
  >(null);

  // Перевірка авторизації
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  // Завантаження favorites з localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteTeachers");
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Завантаження всіх викладачів
  useEffect(() => {
    const loadTeachers = async () => {
      try {
        // Завантажуємо всіх викладачів (великий limit)
        const data = await getTeachers(100);
        setAllTeachers(data);
      } catch (error) {
        console.error("Error loading teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadTeachers();
    }
  }, [user]);

  // Фільтруємо викладачів за favorites
  useEffect(() => {
    const filtered = allTeachers.filter((teacher) => favorites.has(teacher.id));
    setFavoriteTeachers(filtered);
  }, [allTeachers, favorites]);

  // Збереження favorites в localStorage
  useEffect(() => {
    if (favorites.size > 0) {
      localStorage.setItem(
        "favoriteTeachers",
        JSON.stringify(Array.from(favorites))
      );
    } else {
      localStorage.removeItem("favoriteTeachers");
    }
  }, [favorites]);

  const handleFavoriteToggle = (teacherId: string) => {
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

  // Показуємо loader поки перевіряємо авторизацію
  if (authLoading || (loading && user)) {
    return (
      <div className="teachers-loading">
        <p>Loading...</p>
      </div>
    );
  }

  // Якщо не авторизований, не показуємо нічого (редірект вже відбувається)
  if (!user) {
    return null;
  }

  return (
    <>
      <section className="teachers-page">
        <h1 className="teachers-page__title">Favorite Teachers</h1>

        {favoriteTeachers.length === 0 && (
          <div className="teachers-page__empty-state">
            <p className="teachers-page__empty">
              You haven't added any teachers to favorites yet.
            </p>
            <button
              onClick={() => router.push("/teachers")}
              className="teachers-page__browse-btn"
            >
              Browse Teachers
            </button>
          </div>
        )}

        <div className="teachers-grid">
          {favoriteTeachers.map((teacher) => (
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
      </section>

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

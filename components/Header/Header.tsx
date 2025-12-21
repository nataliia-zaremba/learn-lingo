"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Modal from "@/components/Modal/Modal";
import SignupForm from "@/components/Auth/SignupForm";
import LoginForm from "@/components/Auth/LoginForm";
import styles from "./Header.module.css";

export default function Header() {
  const { user, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Image
              src="/images/ukraine.svg"
              alt="LearnLingo"
              width={28}
              height={28}
            />
            LearnLingo
          </div>

          <nav className={styles.nav}>
            <Link href="/">Home</Link>
            <Link href="/teachers">Teachers</Link>
            {user && <Link href="/favorites">Favorites</Link>}
          </nav>

          <div className={styles.actions}>
            {user ? (
              <>
                <span className={styles.userName}>
                  Hello, {user.displayName || "User"}!
                </span>
                <button className={styles.logout} onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <button className={styles.login} onClick={openLoginModal}>
                  <Image
                    src="/images/log-in-01.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                  Log in
                </button>
                <button className={styles.register} onClick={openSignupModal}>
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={closeModals} title="Log In">
        <LoginForm onClose={closeModals} onSwitchToSignup={openSignupModal} />
      </Modal>

      {/* Signup Modal */}
      <Modal
        isOpen={isSignupModalOpen}
        onClose={closeModals}
        title="Registration"
      >
        <SignupForm onClose={closeModals} onSwitchToLogin={openLoginModal} />
      </Modal>
    </>
  );
}

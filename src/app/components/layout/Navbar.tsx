"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Search,
  User,
  Menu,
  X,
  LogOut,
  LogIn,
  UserPlus,
  MessageCircle,
  Compass,
} from "lucide-react";
import { Pause } from "lucide-react";
export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 0, minutes: 0 });

  // Countdown timer for promotional badge
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newMinutes = prev.minutes - 1;
        if (newMinutes < 0) {
          const newHours = prev.hours - 1;
          if (newHours < 0) {
            const newDays = prev.days - 1;
            if (newDays < 0) {
              clearInterval(timer);
              return { days: 0, hours: 0, minutes: 0 };
            }
            return { days: newDays, hours: 23, minutes: 59 };
          }
          return { ...prev, hours: newHours, minutes: 59 };
        }
        return { ...prev, minutes: newMinutes };
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  const handleLogin = () => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    window.location.href = "/signin-email";
  };

  const handleSignup = () => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    window.location.href = "/signup";
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    // Add any logout logic here (clear tokens, etc.)
  };

  const isTrialActive =
    timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-black rounded-full p-1.5">
              <Pause className="h-4 w-4 text-white" />
            </div>
            <span className="text-2xl font-semibold text-black">POSE-LA</span>
          </div>

          {/* Desktop Search Bar - Center */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search through all content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                />
              </div>
            </form>
          </div>

          {/* Desktop Navigation & Promotional Badge */}
          <div className="hidden md:flex items-center space-x-6 flex-shrink-0">
            {/* Chat with SOYA */}
            <Link
              href="/chat"
              className="flex items-center space-x-2 text-black hover:text-gray-700 font-medium transition-colors group"
            >
              <MessageCircle className="h-4 w-4" />
              <span>CHAT WITH SOYA</span>
            </Link>

            {/* Explore the Spaces */}
            <Link
              href="/spaces"
              className="flex items-center space-x-2 text-black hover:text-gray-700 font-medium transition-colors group"
            >
              <Compass className="h-4 w-4" />
              <span>EXPLORE THE SPACES</span>
            </Link>

            {/* Promotional Badge */}
            {isTrialActive && (
              <Link
                href="/offer"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-sm"
              >
                {timeLeft.days > 0 ? (
                  <span>
                    {timeLeft.days} day{timeLeft.days !== 1 ? "s" : ""} left —
                    enjoy it!
                  </span>
                ) : timeLeft.hours > 0 ? (
                  <span>
                    {timeLeft.hours} hour{timeLeft.hours !== 1 ? "s" : ""} left
                    — enjoy it!
                  </span>
                ) : (
                  <span>
                    {timeLeft.minutes} minute{timeLeft.minutes !== 1 ? "s" : ""}{" "}
                    left — enjoy it!
                  </span>
                )}
              </Link>
            )}
          </div>

          {/* Desktop Profile & Actions */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            {/* Mobile Search Icon */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors"
              title="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                title="Profile"
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <User className="h-5 w-5 text-gray-600" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleLogin}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <LogIn className="h-4 w-4" />
                        <span>Login</span>
                      </button>
                      <button
                        onClick={handleSignup}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <UserPlus className="h-4 w-4" />
                        <span>Sign Up</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Search Bar - Shows below nav on mobile */}
        <div className="lg:hidden pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search through all content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Promotional Badge - Mobile */}
            {isTrialActive && (
              <div className="mb-4">
                <Link
                  href="/offer"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 block text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {timeLeft.days > 0 ? (
                    <span>
                      {timeLeft.days} day{timeLeft.days !== 1 ? "s" : ""} left —
                      enjoy it!
                    </span>
                  ) : timeLeft.hours > 0 ? (
                    <span>
                      {timeLeft.hours} hour{timeLeft.hours !== 1 ? "s" : ""}{" "}
                      left — enjoy it!
                    </span>
                  ) : (
                    <span>
                      {timeLeft.minutes} minute
                      {timeLeft.minutes !== 1 ? "s" : ""} left — enjoy it!
                    </span>
                  )}
                </Link>
              </div>
            )}

            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              <Link
                href="/chat"
                className="flex items-center space-x-3 py-3 text-black hover:text-gray-700 font-medium transition-colors border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="h-5 w-5" />
                <span>CHAT WITH SOYA</span>
              </Link>
              <Link
                href="/spaces"
                className="flex items-center space-x-3 py-3 text-black hover:text-gray-700 font-medium transition-colors border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <Compass className="h-5 w-5" />
                <span>EXPLORE THE SPACES</span>
              </Link>
            </div>

            {/* Mobile Auth Actions */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 py-2 text-gray-700 hover:text-black transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full py-2 text-gray-700 hover:text-black transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleLogin}
                    className="flex items-center space-x-3 w-full py-2 text-gray-700 hover:text-black transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={handleSignup}
                    className="flex items-center space-x-3 w-full py-2 text-gray-700 hover:text-black transition-colors"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlay for closing dropdowns when clicking outside */}
      {(isProfileOpen || isMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
};

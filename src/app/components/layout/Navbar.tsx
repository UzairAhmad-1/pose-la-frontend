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
  Pause,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 0, minutes: 0 });

  const { user, isLoading, logout } = useAuth();
  const isLoggedIn = !!user;

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

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleLogin = () => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    window.location.href = "/signup";
  };

  const handleSignup = () => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  const handleProfile = () => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    // window.location.href = "/profile";
  };

  const isTrialActive =
    timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="bg-black rounded-full p-1.5">
              <Pause className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-black whitespace-nowrap">
              POSE-LÀ
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 ml-8">
            <Link
              href="/chat"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-colors whitespace-nowrap"
            >
              DISCUTER AVEC SOYA
            </Link>
            <Link
              href="/subscriptions"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-colors whitespace-nowrap"
            >
              OFFRIR POSE-LÀ
            </Link>
            <Link
              href="/spaces"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-colors whitespace-nowrap"
            >
              EXPLORER LES ESPACES
            </Link>
          </div>

          {/* Right Side: Search + Promotional Badge + Profile */}
          <div className="hidden lg:flex items-center space-x-4 ml-auto">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-48 pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button
                title="Search"
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>

            {/* Promotional Badge */}
            {isTrialActive && (
              <Link
                href="/subscriptions"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 shadow-sm whitespace-nowrap"
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

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                title="Profile"
              >
                <User className="h-5 w-5 text-gray-600" />
                {user?.name && (
                  <span className="text-sm text-gray-700 max-w-24 truncate">
                    {user.name}
                  </span>
                )}
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {isLoggedIn ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.name || user.email}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        <button
                          onClick={handleProfile}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
                        >
                          <User className="h-4 w-4" />
                          <span>My Profile</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleLogin}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
                        >
                          <LogIn className="h-4 w-4" />
                          <span>Login</span>
                        </button>
                        <button
                          onClick={handleSignup}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left"
                        >
                          <UserPlus className="h-4 w-4" />
                          <span>Sign Up</span>
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-20 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="lg:hidden border-t border-gray-200 py-4 relative z-50 bg-white">
              {/* User Info - Mobile */}
              {isLoggedIn && (
                <div className="px-4 py-3 border-b border-gray-100 mb-4">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name || user.email}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              )}

              {/* Mobile Search */}
              <div className="mb-4 px-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search through all content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>

              {/* Promotional Badge - Mobile */}
              {isTrialActive && (
                <div className="mb-4 px-4">
                  <Link
                    href="/subscriptions"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {timeLeft.days > 0 ? (
                      <span>
                        {timeLeft.days} day{timeLeft.days !== 1 ? "s" : ""} left
                        — enjoy it!
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
              <div className="space-y-1 mb-4 px-2">
                <Link
                  href="/chat"
                  className="flex items-center space-x-3 py-3 px-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>DISCUTER AVEC SOYA</span>
                </Link>
                <Link
                  href="/subscriptions"
                  className="flex items-center space-x-3 py-3 px-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="h-5 w-5 flex items-center justify-center">
                    🎁
                  </span>
                  <span>OFFRIR POSE-LÀ</span>
                </Link>
                <Link
                  href="/spaces"
                  className="flex items-center space-x-3 py-3 px-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Compass className="h-5 w-5" />
                  <span>EXPLORER LES ESPACES</span>
                </Link>
              </div>

              {/* Mobile Auth Actions */}
              <div className="border-t border-gray-200 pt-4 px-2">
                {isLoggedIn ? (
                  <div className="space-y-1">
                    <button
                      onClick={handleProfile}
                      className="flex items-center space-x-3 w-full py-2 px-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-colors text-left"
                    >
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full py-2 px-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <button
                      onClick={handleLogin}
                      className="flex items-center space-x-3 w-full py-2 px-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-colors text-left"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </button>
                    <button
                      onClick={handleSignup}
                      className="flex items-center space-x-3 w-full py-2 px-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-md transition-colors text-left"
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Sign Up</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

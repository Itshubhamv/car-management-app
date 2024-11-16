"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";

const Header = () => {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ id: string; title: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(true); // For car animation

  useEffect(() => {
    setHasAnimated(true); // Run car animation every page reload
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search-cars?q=${encodeURIComponent(searchQuery)}`);
        if (response.ok) {
          const { cars } = await response.json();
          setSuggestions(cars);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300); // Debounce user input
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search submitted for:", searchQuery);
    // Implement navigation or filtering logic here
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo with Car Animation */}
        <div className="relative flex items-center space-x-2">
          {hasAnimated && (
            <motion.div
              className="text-2xl absolute left-0"
              initial={{ x: "100%" }}
              animate={{ x: "-150%" }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
              onAnimationComplete={() => setHasAnimated(false)} // Hide car after animation
            >
              🚗
            </motion.div>
          )}
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
          >
            CarManagement
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative flex-grow max-w-md mx-4">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-100 border border-gray-200 rounded-md shadow-sm"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cars..."
              className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>
          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-10">
              {suggestions.map((car) => (
                <li key={car.id}>
                  <Link
                    href={`/details/${car.id}`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    {car.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {isLoading && (
            <div className="absolute top-full left-0 w-full bg-white text-gray-500 text-center py-2 mt-1 shadow-lg">
              Loading...
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-4">
          <Link
            href="/"
            className="px-4 py-2 bg-white text-gray-800 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"
          >
            Home
          </Link>
          <Link
            href="/create"
            className="px-4 py-2 bg-white text-gray-800 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"
          >
            Create
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <SignedOut>
            <Link
              href="/sign-in"
              className="px-4 py-2 bg-gray-100 text-gray-800 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"
            >
              Sign In
            </Link>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center space-x-2">
              {user?.fullName && (
                <span className="text-gray-600">
                  Welcome, <strong>{user.fullName}</strong>
                </span>
              )}
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;

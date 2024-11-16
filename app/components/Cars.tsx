"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Cars: React.FC = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      try {
        const res = await fetch("/api/cars");
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">
        Discover Your Perfect Car
      </h1>
      {loading ? (
        <div className="text-center font-semibold text-gray-600 dark:text-gray-400">
          Loading cars...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative h-48">
                <Image
                  src={car.images[0]}
                  alt={car.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {car.title}
                </h2>
                <Link href={`details/${car.id}`}>
                  <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cars;

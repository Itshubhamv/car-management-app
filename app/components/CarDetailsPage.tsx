"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Trash, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Car {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
}

export default function CarDetailsPage({ id }: { id: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchCarDetails();
    }
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const response = await fetch("/api/get-car", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch car details");
      }
      const data = await response.json();
      setCar(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert("Car deleted successfully!");
        router.push("/"); // Redirect to homepage after deletion
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete the car.");
      }
    } catch (err) {
      console.error("Error deleting car:", err);
      setError("An error occurred while deleting the car.");
    }
  };

  const nextImage = () => {
    if (car) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.images.length);
    }
  };

  const prevImage = () => {
    if (car) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length
      );
    }
  };

  if (!car) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-center font-semibold text-gray-600 dark:text-gray-400">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        {/* Image Carousel */}
        <div className="relative h-64 md:h-96">
          <Image
            src={car.images[currentImageIndex]}
            alt={car.title}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              {car.title}
            </h1>
            <div className="flex gap-2">
              <Link href={`/edit/${id}`}>
                <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  <Edit size={18} className="mr-2" />
                  Edit
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                <Trash size={18} className="mr-2" />
                Delete
              </button>
            </div>
          </div>

          <p className="mt-4 text-gray-700 dark:text-gray-300">{car.description}</p>

          <h2 className="mt-6 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Price Range 
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {car.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => router.push("/")}
            className="mt-8 block w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 text-center transition"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

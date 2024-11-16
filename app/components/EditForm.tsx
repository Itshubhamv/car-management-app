"use client";

import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Car {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
}

export default function EditForm({ id }: { id: string }) {
  const [car, setCar] = useState<Car | null>(null);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
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
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch car details");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const totalImages = (car?.images?.length || 0) + newImages.length;
    if (totalImages > 10) {
      setError("You can upload a maximum of 10 images.");
      return;
    }

    const updatedImages = [
      ...(car?.images || []), 
      ...newImages.map((image) => URL.createObjectURL(image)), 
    ];

    const data = {
      id: car?.id || "",
      title: car?.title || "",
      description: car?.description || "",
      tags: car?.tags || [],
      images: updatedImages, 
    };

    try {
      const response = await fetch("/api/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage("Car updated successfully!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        const responseData = await response.json();
        setError(responseData.message || "Failed to update car.");
      }
    } catch (err) {
      setError("An error occurred while updating the car.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCar((prevCar) => (prevCar ? { ...prevCar, [name]: value } : null));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = (car?.images?.length || 0) + files.length;

    if (totalImages > 10) {
      setError("You can upload a maximum of 10 images.");
      return;
    }

    setNewImages(files);
  };

  const removeImage = (imageUrl: string) => {
    setCar((prevCar) =>
      prevCar
        ? {
            ...prevCar,
            images: prevCar.images.filter((img) => img !== imageUrl),
          }
        : null
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Edit Car</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading car details...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700"
            >
              Car Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={car?.title || ""}
              onChange={handleInputChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. Tesla Model S"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={car?.description || ""}
              onChange={handleInputChange}
              rows={4}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Provide a detailed description..."
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-semibold text-gray-700"
            >
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={car?.tags?.join(", ") || ""}
              onChange={handleInputChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g. electric, SUV, automatic, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Existing Images
            </label>
            <div className="flex gap-4 flex-wrap">
              {car?.images.map((image, index) => (
                <div key={index} className="relative w-32 h-32">
                  <img
                    src={image}
                    alt={`Existing image ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Add New Images
            </label>
            <input
              id="new-images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <div className="flex justify-end gap-4">
            <Link href="/">
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
              >
                Back
              </button>
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

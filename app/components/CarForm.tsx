"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CarForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    if (images.length > 10) {
      setError("You can only upload up to 10 images.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("priceRange", priceRange);
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await fetch("/api/create-car", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Car created successfully!");
        setTitle("");
        setDescription("");
        setPriceRange("");
        setImages([]);
        setLoading(false);
        setTimeout(() => router.push("/"), 2000);
      } else {
        const data = await response.json();
        setError(data.message || "Failed to create car.");
        setLoading(false);
      }
    } catch (err) {
      setError("An error occurred while creating the car.");
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 10) {
      setError("You can only upload up to 10 images.");
      return;
    }
    setImages((prevImages) => [...prevImages, ...files]);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Create a New Car
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Car Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            placeholder="e.g. Maruti Suzuki Swift, Tata Nexon"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            placeholder="Provide details about the car features and specifications."
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="priceRange"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Price Range
          </label>
          <input
            type="text"
            id="priceRange"
            name="priceRange"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            required
            className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            placeholder="e.g. ₹5,00,000 - ₹10,00,000"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-gray-100 file:text-gray-700 dark:file:bg-gray-700 dark:file:text-gray-300 hover:file:bg-gray-200 dark:hover:file:bg-gray-600"
          />
          <div className="mt-4 grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="h-32 w-32 object-cover rounded-md shadow"
                />
              </div>
            ))}
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <div className="flex justify-end gap-4">
          <Link href="/">
            <button
              type="button"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Back
            </button>
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {loading ? "Creating..." : "Create Car"}
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE_URL = "http://localhost/API/";

export default function GalleryDashboard() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dragOver, setDragOver] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); 
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null); 

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    filterImages();
  }, [images, searchTerm, selectedCategory]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}get_images.php`);
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const filterImages = () => {
    let filtered = images;

    if (searchTerm) {
      filtered = filtered.filter(
        (img) =>
          img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          img.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((img) => img.category === selectedCategory);
    }

    setFilteredImages(filtered);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !category) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}uploads.php`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        fetchImages();
        setFile(null);
        setTitle("");
        setCategory("");
        setShowUploadForm(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        // Show SweetAlert2 success popup
        Swal.fire({
          icon: "success",
          title: "Image Uploaded!",
          text: "Your image was added successfully.",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      } else {
        alert(res.data.message || "Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      setFile(files[0]);
      setShowUploadForm(true);
    }
  };

  const getImageUrl = (imagePath) => {
    return `${API_BASE_URL}serve_image.php?path=${encodeURIComponent(
      imagePath
    )}`;
  };

  const getUniqueCategories = () => {
    const categories = [...new Set(images.map((img) => img.category))];
    return categories.filter((cat) => cat && cat.trim() !== "");
  };

  const ImageModal = ({ image, onClose }) => {
    if (!image) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {image.title}
                </h3>
                <p className="text-gray-600 mt-1">{image.category}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <img
              src={getImageUrl(image.image_path)}
              alt={image.title}
              className="w-full h-auto max-h-96 object-contain rounded-lg"
            />
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>❤️ {image.likes} likes</span>
              <span>{new Date(image.uploaded_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Gallery Dashboard
              </h1>
              {/* <p className="text-gray-600 mt-1"> management</p> */}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
                <span className="text-sm text-gray-500 mr-2">📊</span>
                <span className="text-sm font-medium">
                  {filteredImages.length} images
                </span>
              </div>
              <button
                onClick={() => setShowUploadForm(!showUploadForm)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <span className="text-lg">+</span>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full sm:w-80"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Categories</option>
                {getUniqueCategories().map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-gray-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                🔲 Grid
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  viewMode === "table"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                📋 Table
              </button>
            </div>
          </div>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="mb-8 bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Upload New Image
              </h2>
              <button
                onClick={() => setShowUploadForm(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter image title..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter category..."
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image File
                </label>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    dragOver
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-2xl">📸</span>
                      <span className="text-gray-700 font-medium">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl mb-4">📤</div>
                      <p className="text-gray-600 mb-2">
                        Drag & drop your image here, or
                      </p>
                      <input
                        type="file"
                        ref={fileInputRef} 
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="image/*"
                        className="hidden"
                        id="file-input"
                        required
                      />
                      <label
                        htmlFor="file-input"
                        className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200"
                      >
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none"
                >
                  {loading ? "⏳ Uploading..." : "🚀 Upload Image"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Images Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20"
                onClick={() => setSelectedImage(img)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={getImageUrl(img.image_path)}
                    alt={img.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=No+Image";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 truncate">
                    {img.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {img.category}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      ❤️ {img.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Likes
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredImages.map((img) => (
                    <tr
                      key={img.id}
                      className="hover:bg-gray-50/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={getImageUrl(img.image_path)}
                          alt={img.title}
                          className="h-12 w-12 object-cover rounded-lg shadow-sm cursor-pointer hover:scale-110 transition-transform duration-200"
                          onClick={() => setSelectedImage(img)}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/48?text=No+Image";
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {img.title}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {img.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        ❤️ {img.likes}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(img.uploaded_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors duration-200">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🖼️</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No images found
                </h3>
                <p className="text-gray-500">
                  Upload your first image to get started!
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}

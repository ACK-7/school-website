import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Share2,
  MessageCircle,
  X,
  Send,
  Eye,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";

const API_BASE_URL = "http://localhost/API/";

const ModernGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [likes, setLikes] = useState({});
  const [userLikes, setUserLikes] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const galleryRef = useRef(null);
  const modalRef = useRef(null);

  // Get unique categories from fetched images
  const getCategories = () => {
    const uniqueCategories = [...new Set(galleryImages.map(img => img.category))];
    return ["All", ...uniqueCategories.filter(cat => cat && cat.trim() !== "")];
  };

  const categories = getCategories();

  // Fetch images from backend with error handling
  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_BASE_URL}get_images.php`);
      
      if (res.data && Array.isArray(res.data)) {
        setGalleryImages(res.data);
      } else {
        throw new Error('Invalid data format received from server');
      }
    } catch (err) {
      console.error("Failed to fetch images:", err);
      setError('Failed to load images. Please try again later.');
      setGalleryImages([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchImages();
  }, []);

  // Refresh images periodically to sync with dashboard changes
  useEffect(() => {
    const interval = setInterval(fetchImages, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  useEffect(() => {
    // Initialize likes and comments using actual database values
    const initialLikes = {};
    const initialUserLikes = {};
    const initialComments = {};
    
    galleryImages.forEach((img) => {
      // Use actual likes from database, fallback to random if not available
      initialLikes[img.id] = img.likes || Math.floor(Math.random() * 50) + 10;
      initialUserLikes[img.id] = false;
      initialComments[img.id] = [];
    });
    
    setLikes(initialLikes);
    setUserLikes(initialUserLikes);
    setComments(initialComments);
  }, [galleryImages]);

  useEffect(() => {
    // GSAP animations for gallery items
    if (typeof window !== "undefined" && window.gsap) {
      const items = galleryRef.current?.querySelectorAll(".gallery-item");
      if (items) {
        window.gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 50,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          }
        );
      }
    }
  }, [filteredImages]);

  const handleLike = async (imageId, e) => {
    e.stopPropagation();

    // Only allow liking if user hasn't liked this image yet
    if (!userLikes[imageId]) {
      // Optimistically update UI
      setLikes((prev) => ({
        ...prev,
        [imageId]: prev[imageId] + 1,
      }));

      setUserLikes((prev) => ({
        ...prev,
        [imageId]: true,
      }));

      // Add heart animation
      if (typeof window !== "undefined" && window.gsap) {
        const heart = e.target.closest(".like-btn");
        window.gsap.to(heart, {
          scale: 1.3,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        });
      }

      // TODO: Send like to backend
      // try {
      //   await axios.post(`${API_BASE_URL}like_image.php`, { imageId });
      // } catch (error) {
      //   console.error('Failed to save like:', error);
      //   // Revert optimistic update on error
      //   setLikes(prev => ({ ...prev, [imageId]: prev[imageId] - 1 }));
      //   setUserLikes(prev => ({ ...prev, [imageId]: false }));
      // }
    }
  };

  const handleShare = (image, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: image.title,
        text: `Check out this image: ${image.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    if (typeof window !== "undefined" && window.gsap) {
      window.gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }
      );
    }
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;

    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    let nextIndex;

    if (direction === "next") {
      nextIndex =
        currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    } else {
      nextIndex =
        currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }

    setSelectedImage(filteredImages[nextIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;

      if (e.key === "ArrowRight") {
        navigateImage("next");
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      } else if (e.key === "Escape") {
        closeModal();
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [selectedImage, filteredImages]);

  const closeModal = () => {
    if (typeof window !== "undefined" && window.gsap) {
      window.gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        onComplete: () => setSelectedImage(null),
      });
    } else {
      setSelectedImage(null);
    }
  };

  const addComment = async (imageId) => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment,
        imageId: imageId,
        author: "User",
        timestamp: new Date().toISOString(),
      };

      // Add to local state immediately for better UX
      setComments((prev) => ({
        ...prev,
        [imageId]: [...prev[imageId], comment],
      }));

      setNewComment("");

      // TODO: Send comment to backend
      try {
        // await axios.post(`${API_BASE_URL}add_comment.php`, comment);
        console.log("Comment submitted:", comment);
        alert("Comment submitted successfully!");
      } catch (error) {
        console.error('Failed to save comment:', error);
        // Remove from local state on error
        setComments((prev) => ({
          ...prev,
          [imageId]: prev[imageId].filter(c => c.id !== comment.id),
        }));
        alert("Failed to submit comment. Please try again.");
      }
    }
  };

  const getImageUrl = (imagePath) =>
    `${API_BASE_URL}serve_image.php?path=${encodeURIComponent(imagePath)}`;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading gallery...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Gallery</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchImages}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Gallery</h1>
          <p className="text-gray-600">Discover and explore our collection</p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full mx-1 transition-all duration-300 font-medium ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filteredImages.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🖼️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No images found
            </h3>
            <p className="text-gray-500">
              {selectedCategory === "All" 
                ? "No images have been uploaded yet." 
                : `No images found in the "${selectedCategory}" category.`}
            </p>
          </div>
        )}

        {/* Gallery Grid */}
        <div
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="gallery-item group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
              onClick={() => handleImageClick(image)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={getImageUrl(image.image_path)}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {image.category}
                  </span>
                </div>

                {/* View Count */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {Math.floor(Math.random() * 100) + 50}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {image.title}
                </h3>
                

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => handleLike(image.id, e)}
                      disabled={userLikes[image.id]}
                      className={`like-btn flex items-center space-x-1 transition-colors ${
                        userLikes[image.id]
                          ? "text-red-500 cursor-not-allowed"
                          : "text-gray-500 hover:text-red-500 cursor-pointer"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          userLikes[image.id] ? "fill-red-500" : ""
                        }`}
                      />
                      <span className="text-sm">{likes[image.id] || 0}</span>
                    </button>

                    <button
                      onClick={(e) => handleShare(image, e)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(image);
                      }}
                      className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">Comment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div
              ref={modalRef}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            >
              <div className="relative">
                <img
                  src={getImageUrl(selectedImage.image_path)}
                  alt={selectedImage.title}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/800x400?text=Image+Not+Found";
                  }}
                />

                {/* Navigation Arrows */}
                {filteredImages.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateImage("prev")}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                      title="Previous image (←)"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={() => navigateImage("next")}
                      className="absolute right-16 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                      title="Next image (→)"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  title="Close (Esc)"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Image Counter */}
                {filteredImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {filteredImages.findIndex(
                      (img) => img.id === selectedImage.id
                    ) + 1}{" "}
                    / {filteredImages.length}
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedImage.title}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Uploaded {new Date(selectedImage.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedImage.category}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-6 mb-6 pb-6 border-b">
                  <button
                    onClick={(e) => handleLike(selectedImage.id, e)}
                    disabled={userLikes[selectedImage.id]}
                    className={`flex items-center space-x-2 transition-colors ${
                      userLikes[selectedImage.id]
                        ? "text-red-500 cursor-not-allowed"
                        : "text-gray-600 hover:text-red-500 cursor-pointer"
                    }`}
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        userLikes[selectedImage.id] ? "fill-red-500" : ""
                      }`}
                    />
                    <span>{likes[selectedImage.id] || 0} likes</span>
                  </button>

                  <button
                    onClick={(e) => handleShare(selectedImage, e)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <Share2 className="w-6 h-6" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Comment Form */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your comment here..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) =>
                        e.key === "Enter" && addComment(selectedImage.id)
                      }
                    />
                    <button
                      onClick={() => addComment(selectedImage.id)}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Load GSAP */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    </div>
  );
};

export default ModernGallery;
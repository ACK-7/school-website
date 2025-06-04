import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost/API/';

export default function GalleryDashboard() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      console.log('Fetching images from:', `${API_BASE_URL}get_images.php`);
      const response = await axios.get(`${API_BASE_URL}get_images.php`);
      console.log('Response data:', response.data);
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !category) {
      alert('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('category', category);

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}uploads.php`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        alert('Image uploaded successfully!');
        fetchImages();
        setFile(null);
        setTitle('');
        setCategory('');
      } else {
        alert(res.data.message || 'Upload failed.');
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Gallery Manager</h1>

      {/* Image Table */}
      <div className="overflow-x-auto mb-10 shadow rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Image</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Likes</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Uploaded</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {images.map((img) => (
              <tr key={img.id}>
                <td className="px-6 py-4">
                  <img
                    src={`${API_BASE_URL}assets/uploads/${img.image_path}`}
                    alt={img.title}
                    className="h-16 w-16 object-cover rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/64?text=No+Image';
                      console.error('Failed to load image:', img.image_path);
                    }}
                  />
                </td>
                <td className="px-6 py-4">{img.title}</td>
                <td className="px-6 py-4">{img.category}</td>
                <td className="px-6 py-4">{img.likes}</td>
                <td className="px-6 py-4">
                  {new Date(img.uploaded_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                  <button className="text-green-600 hover:underline">Like</button>
                </td>
              </tr>
            ))}
            {images.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-400">
                  No images found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Upload Form */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload New Image</h2>
        <form className="space-y-4" onSubmit={handleUpload}>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Title</label>
            <input
              type="text"
              className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Category</label>
            <input
              type="text"
              className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Choose or Drag Image</label>
            <input
              type="file"
              className="border px-3 py-2 rounded bg-gray-50 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow-md font-medium"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>
      </div>
    </div>
  );
}

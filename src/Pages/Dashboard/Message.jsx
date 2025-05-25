import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEnvelope, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Message = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get("http://localhost/API/contact_submissions.php", {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          timeout: 10000 // 10 second timeout
        });
        
        console.log("API Response:", response.data); // Debug log
        
        if (response.data.success) {
          setSubmissions(response.data.data || []);
        } else {
          throw new Error(response.data.message || "Failed to fetch data");
        }
        
      } catch (err) {
        console.error("Error fetching submissions:", err);
        
        if (err.code === 'ECONNABORTED') {
          setError("Request timeout. Please check if the server is running.");
        } else if (err.response) {
          // Server responded with error status
          setError(err.response.data?.message || `Server error: ${err.response.status}`);
        } else if (err.request) {
          // Request made but no response received
          setError("Cannot connect to server. Please check if the API server is running on http://localhost/API/");
        } else {
          // Something else happened
          setError(err.message || "An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // Filter submissions based on search term
  const filteredSubmissions = submissions.filter((submission) =>
    Object.values(submission).some(
      (value) =>
        value != null &&
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Apply pagination to filtered results
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0a0e1f] to-[#1a2a4a] text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl">
            <FaEnvelope />
          </div>
          <h1 className="text-2xl font-bold tracking-wide">Messages</h1>
        </div>
        <div className="text-sm text-gray-400">
          {loading ? "Loading..." : `Total: ${filteredSubmissions.length} messages`}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#1f2937] rounded-xl p-6 shadow-lg">
        {/* Search and Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          {!loading && !error && totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-800 rounded-lg disabled:bg-gray-700 text-gray-300 disabled:text-gray-500 hover:bg-gray-700 transition-colors"
              >
                <FaChevronLeft />
              </button>
              <span className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-800 rounded-lg disabled:bg-gray-700 text-gray-300 disabled:text-gray-500 hover:bg-gray-700 transition-colors"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <span className="ml-3 text-gray-400">Loading messages...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-4" role="alert">
            <strong className="font-bold">Error:</strong> {error}
          </div>
        )}

        {/* No Data State */}
        {!loading && !error && submissions.length === 0 && (
          <div className="text-center py-12">
            <FaEnvelope className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">No messages found</h3>
            <p className="text-gray-400">There are no contact form submissions to display.</p>
          </div>
        )}

        {/* No Search Results */}
        {!loading && !error && submissions.length > 0 && filteredSubmissions.length === 0 && (
          <div className="text-center py-12">
            <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">No results found</h3>
            <p className="text-gray-400">Try adjusting your search terms.</p>
          </div>
        )}

        {/* Messages Table */}
        {!loading && !error && currentSubmissions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sent At</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {currentSubmissions.map((submission, index) => (
                  <tr key={submission.id || index} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-300">{submission.id || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{submission.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{submission.email || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{submission.phone || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-300 max-w-xs">
                      <div className="truncate" title={submission.message}>
                        {submission.message || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {submission.sent_at ? new Date(submission.sent_at).toLocaleString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
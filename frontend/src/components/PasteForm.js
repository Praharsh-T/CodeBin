import React, { useState } from "react";
import axios from "axios";

const PasteForm = () => {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lineCount, setLineCount] = useState(1); // State to track number of lines

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/api/pastes", {
        content,
      });
      setUrl(response.data.url);
      setContent("");
    } catch (error) {
      setError("Error creating paste. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update line count based on textarea content
  const updateLineCount = (value) => {
    // Split content by lines and update state
    const lines = value.split("\n").length;
    setLineCount(lines);
  };

  return (
    <div className="min-h-screen h-full flex justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-full max-w-screen-xl p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Create a New Paste
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-end mb-4">
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Paste"}
            </button>
          </div>
          <div className="relative flex">
            <div className="absolute top-0 bottom-0 left-0 w-12 bg-gray-200 border-r border-gray-300 overflow-y-auto">
              {/* Render line numbers dynamically */}
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i} className="text-right pr-2">
                  {i + 1}
                </div>
              ))}
            </div>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                updateLineCount(e.target.value); // Update line count on change
              }}
              placeholder="Paste your text here..."
              className="flex-1 w-full p-4 pl-14 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm bg-gray-50"
              style={{ minHeight: "calc(100vh - 16rem)" }}
            />
          </div>
          {url && (
            <div className="mt-4 text-center">
              <p className="text-lg font-medium text-gray-700">
                Paste URL:{" "}
                <a href={`/${url}`} className="text-blue-500 hover:underline">
                  {url}
                </a>
              </p>
            </div>
          )}
          {error && (
            <div className="mt-4 text-center">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PasteForm;

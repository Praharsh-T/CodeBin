import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PasteView = () => {
  const { url } = useParams();
  const [paste, setPaste] = useState(null);

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/pastes/${url}`
        );
        setPaste(response.data);
      } catch (error) {
        console.error("Error fetching paste", error);
      }
    };

    fetchPaste();
  }, [url]);

  const copyToClipboard = async () => {
    if (paste && paste.content) {
      try {
        await navigator.clipboard.writeText(paste.content);
        alert("Text copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-5xl p-6 bg-white shadow-md rounded-lg">
        {paste ? (
          <div>
            <h1 className="text-3xl font-mono font-extrabold text-gray-800 mb-4">CODEBIN</h1>
            <div className="flex justify-end mb-4">
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
              >
                Copy Text
              </button>
            </div>
            <textarea
              className="w-full h-screen p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm text-gray-700 text-lg resize-none"
              value={paste.content}
              readOnly
            />
          </div>
        ) : (
          <div className="text-center">
            <svg
              className="animate-spin h-5 w-5 text-gray-500 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="text-gray-600">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasteView;

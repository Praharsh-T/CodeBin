import React, { useState } from "react";
import axios from "axios";

const PasteForm = () => {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500'>
      <div className='w-full max-w-screen-lg mx-auto p-6 bg-white rounded-xl shadow-md space-y-6'>
        <h1 className='text-3xl font-bold text-center text-gray-900'>
          Create a New Paste
        </h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Paste your text here...'
            className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            rows='10'
          />
          <button
            type='submit'
            className={`w-full py-3 text-center text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
            }`}
            disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Paste"}
          </button>
        </form>
        {url && (
          <div className='mt-4 text-center'>
            <p className='text-lg font-medium text-gray-700'>
              Paste URL:{" "}
              <a href={`/${url}`} className='text-blue-500 hover:underline'>
                {url}
              </a>
            </p>
          </div>
        )}
        {error && (
          <div className='mt-4 text-center'>
            <p className='text-sm text-red-500'>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasteForm;

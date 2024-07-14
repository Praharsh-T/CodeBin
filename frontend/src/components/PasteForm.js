import React, { useState } from "react";
import axios from "axios";

const PasteForm = () => {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/pastes", {
        content,
      });
      setUrl(response.data.url);
    } catch (error) {
      console.error("Error creating paste", error);
    }
  };

  return (
    <div className='p-4'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Paste your text here...'
          className='w-full p-2 border border-gray-300 rounded'
        />
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded'>
          Create Paste
        </button>
      </form>
      {url && (
        <p className='mt-4'>
          Paste URL:{" "}
          <a href={`/${url}`} className='text-blue-500'>
            {url}
          </a>
        </p>
      )}
    </div>
  );
};

export default PasteForm;

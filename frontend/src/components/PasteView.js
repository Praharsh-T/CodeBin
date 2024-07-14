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

  return (
    <div className='p-4'>
      {paste ? (
        <div>
          <h1 className='text-2xl font-bold'>Paste</h1>
          <p className='mt-4'>{paste.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PasteView;

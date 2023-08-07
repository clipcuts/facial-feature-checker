import React, { useRef } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const imageInput = useRef(null);

  const handleUpload = async () => {
    const file = imageInput.current.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message === 'UPLOAD_SUCCESS') {
        alert('Image uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" ref={imageInput} />
      <button id="uploadButton" onClick={handleUpload}>
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploader;
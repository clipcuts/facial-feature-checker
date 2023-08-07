import React, { useRef, useState } from 'react';
import { FaceApi } from '../utils/faceApi';
import { Sharp } from '../utils/sharp';

const FacialFeatureExtractor = () => {
  const [image, setImage] = useState(null);
  const imageInputRef = useRef();

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleExtractFeatures = async () => {
    const faceApi = new FaceApi();
    const sharp = new Sharp();

    const facialLandmarks = await faceApi.detectFacialLandmarks(image);
    const croppedFeatures = await sharp.cropFacialFeatures(facialLandmarks);

    return croppedFeatures;
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        onChange={handleImageChange}
      />
      <button onClick={handleExtractFeatures}>Extract Facial Features</button>
      {image && <img src={image} alt="Selected" />}
    </div>
  );
};

export default FacialFeatureExtractor;
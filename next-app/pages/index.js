import React from 'react';
import ImageUploader from '../components/ImageUploader';
import FacialFeatureExtractor from '../components/FacialFeatureExtractor';
import FacialFeatureComparer from '../components/FacialFeatureComparer';
import '../public/styles.css';

export default function Home() {
  return (
    <div className="container">
      <h1>Facial Feature Comparison App</h1>
      <ImageUploader />
      <FacialFeatureExtractor />
      <FacialFeatureComparer />
    </div>
  );
}
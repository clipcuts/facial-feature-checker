import React, { useState } from 'react';
import axios from 'axios';

const FacialFeatureComparer = () => {
  const [compareResult, setCompareResult] = useState(null);

  const compareFeatures = async () => {
    try {
      const response = await axios.post('/api/compare');
      if (response.data.success) {
        setCompareResult(response.data.result);
      } else {
        console.error('Comparison failed');
      }
    } catch (error) {
      console.error('Error comparing features', error);
    }
  };

  return (
    <div>
      <button id="compareButton" onClick={compareFeatures}>Compare Features</button>
      {compareResult && (
        <div>
          <h2>Comparison Result</h2>
          <p>Your facial features are most similar to: {compareResult}</p>
        </div>
      )}
    </div>
  );
};

export default FacialFeatureComparer;
import axios from 'axios';
import { VectorStorage } from '../../utils/vectorStorage';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { facialFeature } = req.body;
      const vectorStorage = new VectorStorage();

      // Get all facial features from the vector storage
      const allFacialFeatures = await vectorStorage.getAll();

      // Compare the uploaded facial feature with the ones in the vector storage
      const comparisons = allFacialFeatures.map((storedFeature) => {
        return axios.post('http://face-api.com/compare', {
          feature1: facialFeature,
          feature2: storedFeature,
        });
      });

      // Wait for all comparisons to finish
      const results = await Promise.all(comparisons);

      // Send the comparison results to the client
      res.status(200).json({ message: 'COMPARE_SUCCESS', data: results });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
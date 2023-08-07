import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { extractFacialFeatures } from '../../components/FacialFeatureExtractor';
import { VectorStorage } from '../../utils/vectorStorage';

const upload = multer({ dest: 'uploads/' });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const uploadMiddleware = upload.single('image');
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const image = req.file;
      if (!image) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      try {
        const facialFeatures = await extractFacialFeatures(image.path);
        await VectorStorage.uploadFacialFeatures(facialFeatures);
        res.status(200).json({ message: 'UPLOAD_SUCCESS' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
const sharp = require('sharp');

const cropFacialFeature = async (imageBuffer, facialFeature) => {
  const { x, y, width, height } = facialFeature;
  const croppedImageBuffer = await sharp(imageBuffer)
    .extract({ left: x, top: y, width, height })
    .toBuffer();
  return croppedImageBuffer;
};

module.exports = {
  cropFacialFeature,
};
const faceapi = require('face-api.js');

async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models');
  await faceapi.nets.faceLandmark68Net.loadFromDisk('./models');
  await faceapi.nets.faceRecognitionNet.loadFromDisk('./models');
}

async function getFaceDescription(buffer) {
  await loadModels();
  const img = await faceapi.bufferToImage(buffer);
  const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
  return detections;
}

module.exports = {
  getFaceDescription,
};
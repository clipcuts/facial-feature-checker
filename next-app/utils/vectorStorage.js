const fs = require('fs');
const path = require('path');

class VectorStorage {
  constructor() {
    this.storagePath = path.join(__dirname, '../storage');
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath);
    }
  }

  saveFeatureVector(featureVector, filename) {
    const filePath = path.join(this.storagePath, filename);
    fs.writeFileSync(filePath, JSON.stringify(featureVector));
  }

  getAllFeatureVectors() {
    const files = fs.readdirSync(this.storagePath);
    return files.map(file => {
      const filePath = path.join(this.storagePath, file);
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    });
  }
}

module.exports = new VectorStorage();
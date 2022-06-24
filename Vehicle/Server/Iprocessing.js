
const sharp = require('sharp');
// const uuidv4 = require('uuid/v4');
const path = require('path');

class Iprocessing {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer, name) {
    const filename = Iprocessing.filename(name);
    const filepath = this.filepath(filename);

    await sharp(buffer)
    //   .resize(300, 300, {
    //     fit: sharp.fit.inside,
    //     withoutEnlargement: true
    //   })
      .toFile(filepath);
    
    return filename;
  }
  static filename(name) {
    return `${name}.png`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Iprocessing;
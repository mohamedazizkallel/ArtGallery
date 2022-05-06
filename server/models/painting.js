var mongoose = require('mongoose');

var PaintingSchema = new mongoose.Schema({
  name: String,
  artist: String,
  year: Number,
  paintingImg: String,
  cloudinary_id: String
});

module.exports = mongoose.model('Painting', PaintingSchema);

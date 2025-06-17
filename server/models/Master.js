const mongoose = require('mongoose');

const masterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  status: String,
});

module.exports = mongoose.model('Master', masterSchema);

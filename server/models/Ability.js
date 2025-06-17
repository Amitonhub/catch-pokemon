const mongoose = require('mongoose');

const abilitySchema = new mongoose.Schema({
  masterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Master'
  },
  ability: { type: String, required: true },
  type: String,
  damage: Number,
  status: String,
});

module.exports = mongoose.model('Ability', abilitySchema);

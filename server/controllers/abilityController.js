const Ability = require('../models/Ability');

const createAbility = async (req, res) => {
  try {
    const { masterId } = req.body;
    if (!masterId) return res.status(400).json({ error: 'masterId is required' });

    const ability = new Ability(req.body);
    await ability.save();
    res.status(201).json(ability);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create ability' });
  }
};

const listAbilitiesByMasterId = async (req, res) => {
  try {
    const abilities = await Ability.find({ masterId: req.params.masterId });
    res.json(abilities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch abilities' });
  }
};

const updateAbility = async (req, res) => {
  try {
    const updated = await Ability.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Ability not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update ability' });
  }
};

const deleteAbility = async (req, res) => {
  try {
    const deleted = await Ability.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Ability not found' });
    res.json({ message: 'Ability deleted', deleted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete ability' });
  }
};

module.exports = {
  createAbility,
  listAbilitiesByMasterId,
  updateAbility,
  deleteAbility
};

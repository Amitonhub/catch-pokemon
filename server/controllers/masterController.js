const Master = require('../models/Master');
const Ability = require('../models/Ability');

const createPokemon = async (req, res) => {
  try {
    const { name, status } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const data = new Master({ name, image: imagePath, status });
    await data.save();

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create Pokemon' });
  }
};

const getPokemonByName = async (req, res) => {
  try {
    const name = req.params.name;

    const master = await Master.findOne({
      name: { $regex: name, $options: 'i' }
    });

    if (!master) return res.status(404).json({ error: 'Pokemon not found' });

    const abilities = await Ability.find({ masterId: master._id });
    const serverUrl = `${req.protocol}://${req.get('host')}`;
    const masterWithFullImage = {
      ...master.toObject(),
      image: master.image ? `${serverUrl}${master.image}` : ''
    };

    res.json({ master: masterWithFullImage, abilities });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


const listAllPokemon = async (req, res) => {
  try {
    const all = await Master.find();
    const serverUrl = `${req.protocol}://${req.get('host')}`;

    const updated = all.map((p) => ({
      ...p.toObject(),
      image: p.image ? `${serverUrl}${p.image}` : ''
    }));

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Pokemons' });
  }
};


const updatePokemon = async (req, res) => {
  try {
    const updated = await Master.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Pokemon not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update' });
  }
};

const deletePokemon = async (req, res) => {
  try {
    const deleted = await Master.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Pokemon not found' });

    await Ability.deleteMany({ masterId: deleted._id });
    res.json({ message: 'Pokemon deleted', deleted });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
};

module.exports = {
  createPokemon,
  getPokemonByName,
  listAllPokemon,
  updatePokemon,
  deletePokemon
};

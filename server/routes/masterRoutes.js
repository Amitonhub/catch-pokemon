const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const {
  createPokemon,
  getPokemonByName,
  listAllPokemon,
  updatePokemon,
  deletePokemon
} = require('../controllers/masterController');

router.post('/', upload.single('image'), createPokemon);
router.get('/', listAllPokemon);
router.get('/:name', getPokemonByName);
router.put('/:id', updatePokemon);
router.delete('/:id', deletePokemon);

module.exports = router;

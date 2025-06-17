const express = require('express');
const router = express.Router();
const {
  createAbility,
  listAbilitiesByMasterId,
  updateAbility,
  deleteAbility
} = require('../controllers/abilityController');

router.post('/', createAbility);
router.get('/:masterId', listAbilitiesByMasterId);
router.put('/:id', updateAbility);
router.delete('/:id', deleteAbility);

module.exports = router;
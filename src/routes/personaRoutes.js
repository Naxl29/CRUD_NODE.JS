'use strict';

const express = require('express');
const PersonaController = require('../Controllers/personaController');

const router = express.Router();

router.post('/persona', PersonaController.savePersona);
router.get('/personas', PersonaController.getPersonas);
// Agrega más rutas si lo necesitas: getPersonaById, updatePersona, deletePersona, etc.

module.exports = router;

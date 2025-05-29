'use strict';

const express = require('express');
const PersonaController = require('../Controllers/personaController');

const router = express.Router();

router.post('/persona', PersonaController.savePersona);
router.get('/personas', PersonaController.getPersonas);
router.get('/persona/:id', PersonaController.getPersonaId);   
router.put('/persona/:id', PersonaController.updatePersona);    
router.delete('/persona/:id', PersonaController.deletePersona); 

module.exports = router;

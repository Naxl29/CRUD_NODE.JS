'use strict'

const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PersonaSchema = new Schema({
    primer_nombre: { type: String, required: true},
    segundo_nombre: { type: String, required: true},
    primer_apellido: { type: String, required: true},
    segundo_apellido: { type: String, required: true},
    n_documento: { type: String, required: true, unique: true },
})

module.exports = mongoose.model('Persona', PersonaSchema)
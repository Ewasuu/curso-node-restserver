const { Schema, model } = require('mongoose')

const categorieSchema = Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es necesario']
	},
	estado: {
		type: Boolean,
		default: true,
		required: true
	},
	usuario: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
})


module.exports = model('Categorie', categorieSchema)
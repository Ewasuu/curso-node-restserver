const { Schema, model } = require('mongoose')


const productSchema = Schema({
	nombre: {
		type: String,
		required: [true, 'El nombre es necesario'],
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
	},
	Precio: {
		type: Number,
		default: 0
	},
	categoria: {
		type: Schema.Types.ObjectId,
		ref: 'Categorie',
		required: true
	},
	descripcion: {
		type: String
	},
	img: {
		type: String
	},
	disponible: {
		type: Boolean,
		default: true
	}
})


module.exports = model('Product', productSchema)
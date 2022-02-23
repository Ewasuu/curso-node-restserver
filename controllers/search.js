const { ObjectId } = require('mongoose').Types

const { User, Product, Categorie } = require('../models')

const coleccionesPermitidas = [
	'user',
	'categorie',
	'product',
	'role'
]

const buscarUsuarios = async( termino = '', res ) => {

	const esMongoId = ObjectId.isValid( termino )

	if ( esMongoId ) {

		const user = await User.findById( termino )

		return res.json({
			results: (user) ? [user] : []
		}) 
	}

	const regex = new RegExp( termino, 'i' )

	const user = await User.find({
		$or: [{ nombre: regex }, { correo: regex }],
		$and: [{estado: true}]
	})

	res.json({
				results: user
			})

}

const buscarCategoria = async( termino = '', res ) => {

	const esMongoId = ObjectId.isValid( termino )

	if ( esMongoId ) {

		const categorie = await Categorie.findById( termino ).populate('usuario', 'nombre')

		return res.json({
			results: (categorie) ? [categorie] : []
		}) 
	}

	const regex = new RegExp( termino, 'i' )

	const categorie = await Categorie.find({ nombre: regex }).populate('usuario', 'nombre')

	res.json({
				results: categorie
			})

}



const buscarProducto = async( termino = '', res ) => {

	const esMongoId = ObjectId.isValid( termino )

	if ( esMongoId ) {

		const product = await Product.findById( termino ).populate('categoria', 'nombre').populate('usuario', 'nombre')

		return res.json({
			results: (product) ? [product] : []
		}) 
	}

	const regex = new RegExp( termino, 'i' )

	const product = await Product.find({nombre: regex, estado: true}).populate('categoria', 'nombre').populate('usuario', 'nombre')

	res.json({
				results: product
			})

}

const search = async(req, res) => {

	const { coleccion, termino } = req.params

	if (!coleccionesPermitidas.includes(coleccion)) {
		return res.status(400).json({
			msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
		})
	}

	switch(coleccion){
		case 'user':
			buscarUsuarios( termino, res )
			break
		case 'categorie':
			buscarCategoria( termino, res )
			break
		case 'product':
			buscarProducto( termino, res )
			break
		default:
			res.status(500).json({
				msg: 'jsjs no hay nada, mala mia'
			})
	}
}

module.exports = {
	search
}
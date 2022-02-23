const { Product } = require('../models')



const createProduct = async(req, res) => {
	//ID de la categoria
	const { id } = req.params
	const { nombre, precio = 0, descripcion = '' } = req.body

	const data = {
		nombre,
		precio,
		usuario: req.authenticatedUser._id,
		categoria: id,
		descripcion
	}

	const product = await Product(data)

	await product.save()

	res.status(201).json({
		msg: 'El producto se ha añadido con exito',
		product
	})

}

const getProducts = async(req, res) => {

	const { from = 0, limit = 5 } = req.query
	const query = { estado: true }

	const [total, products] = await Promise.all([
			Product.countDocuments(query),
			Product.find(query)
				.populate({ path: 'usuario', select: 'nombre' })
				.populate({ path: 'categoria', select: 'nombre' })
				.skip( Number(from) )
				.limit( Number(limit) )
		])


	res.json({
		total,
		products
	})
}

const getProduct = async(req, res) => {

	const { id } = req.params

	const categorie = await Product.findById( id )
										.populate({ path: 'usuario', select: 'nombre' })
										.populate({ path: 'categoria', select: 'nombre' })

	res.json({
		categorie
	})
}

const updateProduct = async(req, res) => {

	const { id } = req.params
	const { estado, usuario, ...rest } = req.body

	const product = await Product.findByIdAndUpdate(id, rest)

	res.json({
		msg: 'Se ha actualizado correctamente',
		product
	})

}

const deleteProduct = async(req, res) => {

	const { id } = req.params

	const product = await Product.findByIdAndUpdate( id, { estado: false } )

	res.json({
		msg: 'Se elimino el producto',
		product
	})

}


module.exports = {
	createProduct,
	deleteProduct ,
	getProducts,
	getProduct,
	updateProduct
}
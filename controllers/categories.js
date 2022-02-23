const { Categorie } = require('../models')




const getCategories = async(req, res) => {

	const { limit = 5, from = 0 } = req.query
	const query = { estado: true }

	const [total, categories] = await Promise.all([
			Categorie.countDocuments(query),
			Categorie.find(query)
				.populate({ path: 'usuario', select: 'nombre' })
				.skip(Number(from))
				.limit(Number(limit))
		])
	

	res.json({
		total,
		categories
	}) 

}

const getCategorie = async(req, res) => {

	const { id } = req.params

	const categorie = await Categorie.findById(id).populate({ path: 'usuario', select: 'nombre' })


	res.json({
		categorie
	})

}


const createCategories = async(req, res) => {

	const nombre = req.body.nombre.toUpperCase()

	const categorieDB = await Categorie.findOne({nombre})

	if (categorieDB) {
		return res.status(401).json({
			msg: `La categoria ${nombre} ya existe`
		})
	}

	const data = {
		nombre,
		usuario: req.authenticatedUser._id
	}

	const categorie = new Categorie(data)


	await categorie.save()

	res.status(201).json({
		msg: `La categoria ${nombre} a sido añadida exitosamente`
	})
}


const updateCategorie = async(req, res) => {

	const nuevo_nombre = req.body.nuevo_nombre.toUpperCase()
	const { id } = req.params

	const existName = await Categorie.findOne({nombre: nuevo_nombre}) 

	if (existName) {
		return res.status(400).json({
			msg: `La categoria ${nuevo_nombre} ya existe, por favor ingrese otra`
		})
	}

	const categorie = await Categorie.findByIdAndUpdate(id, {nombre: nuevo_nombre})

	res.json({
		categorie
	})
}

const deleteCategorie = async(req, res) => {

	const { id } = req.params

	const categorie = await Categorie.findByIdAndUpdate(id, { estado: false })

	res.json({
		msg: 'Se ha eliminado correctamente',
		categorie
	})
}

module.exports = {
	getCategories,
	getCategorie,
	createCategories,
	updateCategorie,
	deleteCategorie
}
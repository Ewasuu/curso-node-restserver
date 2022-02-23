const bcryptjs = require('bcryptjs')

const User = require('../models/user')


const usersGet = async(req, res) => {

	const { limit = 5, from = 0 } = req.query
	const query = { estado: true }



	const [total, users] = await Promise.all([
		User.countDocuments(query),
		User.find(query)
		.skip( Number(from) )
		.limit( Number(limit) )
		])

	res.json({
		total, 
		users
	})
}

const usersPut = async(req, res) => {

	const { id } = req.params
	const { _id, password, google, correo,...rest } = req.body


	//Validar contra base de datos
	if (password) {
		//Encriptar contraseña
		const salt = bcryptjs.genSaltSync()
		rest.password = bcryptjs.hashSync( password, salt )	
	}

	const user = await User.findByIdAndUpdate( id, rest )

	res.json({
		user
	})
}

const usersPost = async (req, res) => {

	const {  nombre, correo, password, rol } = req.body
	const user = new User({ nombre, correo, password, rol } )

	//Encriptar la contraseña
	const salt = bcryptjs.genSaltSync()
	user.password = bcryptjs.hashSync( password, salt )

	//Guardar en BD
	await user.save()


	res.json({
		user
	})
}
const usersDelete = async(req, res) => {

	const { id } = req.params
	const uid = req.uid
	const authenticated = req.authenticatedUser

	const user = await User.findByIdAndUpdate(id, { estado: false })

	res.json({
		"User_deleted": user,
		"User_authenticated": authenticated
	})
}

const usersPatch = (req, res) => {

	res.json({
		msg: 'Patch - controller'
	})
}

module.exports = {
	usersGet,
	usersPut,
	usersPost,
	usersDelete,
	usersPatch
}
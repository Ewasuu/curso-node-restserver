const jwt = require('jsonwebtoken')
const User = require('../models/user')


const validateJWT = async(req, res, next) => {

	const token = req.header('x-token')

	if (!token) {
		res.status(401).json({
			msg: 'No hay token en la peticion'
		})
	}

	try{

		const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )

		const user = await User.findById(uid)

		if (!user) {
			return res.status(400).json({
				msg: 'No existe un usuario con ese ID'
			})
		}

		//Verificar si el usuario está activo
		if (!user.estado) {
			return res.status(400).json({
				msg: 'Ese usuario está inactivo, no puede eliminar a nadie'
			})
		}

		req.authenticatedUser = user


		next()
	}catch(error){
		console.log(error)
		res.status(401).json({
			msg: 'token no valido'
		})
	}
}

module.exports = {
	validateJWT
}
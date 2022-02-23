const bcrypt = require('bcryptjs')

const User = require('../models/user')
const { generateJWT } = require('../helpers/generatejwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async(req, res) => {

	const { correo, password } = req.body

	try{

		//Verificar si el email existe
		user = await User.findOne({ correo })
		if (!user) {
			return res.status(400).json({
				msg: 'El correo ingresado no tiene una cuenta registrada'
			})
		}

		//Verificar si el usuario está activo
		if (!user.estado) {
			return res.status(400).json({
				msg: 'El correo ingresado no tiene una cuenta registrada'
			})
		}

		//Verificar la contraseña
		const validatePassword = bcrypt.compareSync( password, user.password )
		if (!validatePassword) {
			return res.status(400).json({
				msg: 'La contraseña es incorrecta'
			})
		}

		//Generar el jwt
		const token = await generateJWT( user.id )

		res.json({
			user,
			token
		})
	} catch(error){
		console.log(error)
		res.status(500).json({
			msg: 'Algo salio mal, por favor pongase en contacto con el admin del servidor'
		})

	}

}

const googleSignIn = async(req, res) => {
	const { id_token } = req.body

	try{

		const { correo, nombre, img } = await googleVerify(id_token)

		//Verificar que la cuenta no esté ya registrada
		let user = await User.findOne({ correo })

		if (!user) {
			const data = {
				nombre,
				correo,
				password: 'xdc',
				rol: 'ADMIN_ROLE',
				google: true
			}

			user = new User( data )

			await user.save()
		}

		if (!user.estado) {
			return res.status(401).json({
				msg: 'Este usuario esta bloqueado'
			})
		}

		const token = await generateJWT( user.id )

		res.json({
			user,
			token
		})

	} catch(error){
		console.log(error)
		res.status(400).json({
			msg: ''
		})
	}
}


module.exports = {
	login,
	googleSignIn
}
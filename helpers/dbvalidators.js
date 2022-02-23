const { Categorie } = require('../models')
const { Product } = require('../models')
const { Role } = require('../models')
const { User } = require('../models')



const roleValidator = async(rol = '') => {

	const existsRol = await Role.findOne({ rol })
	if (!existsRol) {
		throw new Error('El rol es invalido')

	}

}

const emailExistsValidator = async(correo) => {
	const emailExists = await User.findOne({ correo })
	if (emailExists) {

		throw new Error('Ese correo ya tiene una cuenta')
	}
}

const idExistsValidator = async(id) => {
	const emailExists = await User.findById( id )
	if (!emailExists) {

		throw new Error('No existe un usuario con el ID ingresado')
	}
}

const existCategorie = async(id) => {
	const existSomeCategorie = await Categorie.findById(id)
	if (!existSomeCategorie) {

		throw new Error('No existe una categoria con ese ID')

	}
}

const existProduct = async(id) => {
	const existSomeProduct = await Product.findById(id)
	if (!existSomeProduct) {

		throw new Error('No existe un producto con ese ID')

	}
}

const allowedCollection = ( collection = '', collections = [] ) => {

	const have = collections.includes(collection)

	if (!have) {
		throw new Error('Esa coleccion no es permitida')
	}

	return true

}


module.exports = {
	roleValidator,
	emailExistsValidator,
	idExistsValidator,
	existCategorie,
	existProduct,
	allowedCollection
}
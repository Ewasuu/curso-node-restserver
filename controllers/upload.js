const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL )


const { uploadFile } = require('../helpers/upload-file')
const { User, Product } = require('../models')


const postUploadFiles = async(req, res) => {


	try{

		const fileName = await uploadFile( req.files, undefined, '' )

		res.json({
			fileName
		})

	} catch(error){
		res.status(400).json({msg: error})
	}
	
}

const putUploadFiles = async(req, res) => {

	const { coleccion, id } = req.params

	let model

		switch(coleccion){
		case 'users':
			model = await User.findById(id)
			if (!model) {
				return res.status(400).json({
					msg: `No esxite un usuario con el ID ${id}`
				})
			}
			break
		case 'products':
			model = await Product.findById(id)
			if (!model) {
				return res.status(400).json({
					msg: `No esxite un producto con el ID ${id}`
				})
			}
			break
		default:
			res.status(500).json({
				msg: 'jsjs no hay nada, mala mia'
			})
		}

	//Limpiar Imagenes Previas
	try{

		if (model.img) {
			const pathImg = path.join( __dirname, '../uploads', coleccion, model.img )
			if (fs.existsSync( pathImg )) {
				fs.unlinkSync( pathImg )
			}
		}

	} catch(error){
		console.log(error)
		res.status(400).json({msg: 'algo salio mal'})
	}

	const name = await uploadFile( req.files, undefined, coleccion )
	model.img = name

	await model.save()

	res.json({
		model
	})
}

const putUploadFilesCloudinary = async(req, res) => {

	const { coleccion, id } = req.params

	let model

		switch(coleccion){
			case 'users':
				model = await User.findById(id)
				if (!model) {
					return res.status(400).json({
						msg: `No esxite un usuario con el ID ${id}`
					})
				}
				break
			case 'products':
				model = await Product.findById(id)
				if (!model) {
					return res.status(400).json({
						msg: `No esxite un producto con el ID ${id}`
					})
				}
				break
			default:
				res.status(500).json({
					msg: 'jsjs no hay nada, mala mia'
				})
		}

	//Limpiar Imagenes Previas
	try{

		if (model.img) {
			const nombreArr = model.img.split('/')
			const nombre = nombreArr[ nombreArr.length - 1 ]
			const [ public_id ] = nombre.split('.')

			cloudinary.uploader.destroy(public_id)
		}

		const { tempFilePath } = req.files.file

		const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
		model.img = secure_url


	} catch(error){
		console.log(error)
		res.status(500).json({msg: 'algo salio mal'})
	}


	await model.save()

	res.json({
		model
	})
}




const showPicture = async(req, res) => {

	const { coleccion, id } = req.params

	let model

		switch(coleccion){
		case 'users':
			model = await User.findById(id)
			if (!model) {
				return res.status(400).json({
					msg: `No esxite un usuario con el ID ${id}`
				})
			}
			break
		case 'products':
			model = await Product.findById(id)
			if (!model) {
				return res.status(400).json({
					msg: `No esxite un producto con el ID ${id}`
				})
			}
			break
		default:
			res.status(500).json({
				msg: 'jsjs no hay nada, mala mia'
			})
		}

	try{

		if (model.img) {
			const pathImg = path.join( __dirname, '../uploads', coleccion, model.img )
			if (fs.existsSync( pathImg )) {
				return res.sendFile( pathImg )
			}
		}

	} catch(error){
		console.log(error)
		return res.status(400).json({msg: 'algo salio mal'})
	}

	const pathImg = path.join( __dirname, '../assets/no-image.jpg' )

	res.sendFile(pathImg)

}


module.exports = {
	postUploadFiles,
	putUploadFiles,
	putUploadFilesCloudinary,
	showPicture
}
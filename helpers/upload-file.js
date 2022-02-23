const path = require('path')
const { v4: uuidv4 } = require('uuid')


const uploadFile = ( files, validExtensions = ['jpg', 'jpng','png', 'gif'], carpeta = '' ) => {

	return new Promise((resolve, reject) => {

		const { file } = files

		const nombreCortado = file.name.split('.')
		const extension = nombreCortado[ nombreCortado.length - 1]


		if (!validExtensions.includes(extension)) {
			return reject(`La extension ${extension} es un formato invalido`)
		}


		const tempName = uuidv4() + '.' + extension
		uploadPath = path.join(__dirname, '../uploads/', carpeta,tempName)

		file.mv(uploadPath, (err) => {
		    if (err) {
		      return reject(err)
		    }

		    resolve(tempName)
		})

	})
}






module.exports = {
	uploadFile
}
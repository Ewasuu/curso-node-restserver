const { Router } = require('express')
const { check } = require('express-validator')


const { allowedCollection } = require('../helpers/dbvalidators')
const { anyFile } = require('../middlewares/anyfile')
const { postUploadFiles, putUploadFiles, showPicture, putUploadFilesCloudinary } = require('../controllers/upload')
const { validateFields } = require('../middlewares/validateFields')



const router = Router()

router.post('/', anyFile, postUploadFiles )

router.put('/:coleccion/:id', [
	anyFile,
	check('id', 'El ID es invalido').isMongoId(),
	check('coleccion').custom( c => allowedCollection(c, ['users', 'products'])),
	validateFields
	], putUploadFilesCloudinary)

router.get('/:coleccion/:id', [
	check('id', 'El ID es invalido').isMongoId(),
	check('coleccion').custom( c => allowedCollection(c, ['users', 'products'])),
	validateFields
	], showPicture)


module.exports = router
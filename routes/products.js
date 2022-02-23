const { Router } = require('express')
const { check } = require('express-validator')

const { createProduct, deleteProduct, getProducts, getProduct, updateProduct } = require('../controllers/products')
const { existCategorie, existProduct } = require('../helpers/dbvalidators')
const { isAdminRole } = require('../middlewares/isadminrole')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validatejwt')


const router = Router()

router.post('/:id', [
	validateJWT,
	check('nombre', 'El nombre es obligatorio').not().isEmpty(),
	check('id', 'Ingrese un ID valido').isMongoId(),
	check('id').custom( existCategorie),
	validateFields
	], createProduct)

router.get('/', getProducts)

router.get('/:id', [
	check('id', 'Ingrese un ID valido').isMongoId(),
	check('id').custom( existProduct ),
	validateFields
	], getProduct)

router.put('/:id', [
	validateJWT,
	check('id', 'Ingrese un ID valido').isMongoId(),
	check('id').custom( existProduct ),
	validateFields	
	], updateProduct )

router.delete('/:id', [
	validateJWT,
	isAdminRole,
	check('id', 'Ingrese un ID valido').isMongoId(),
	check('id').custom( existProduct ),
	validateFields
	], deleteProduct )


module.exports = router

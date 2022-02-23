const { Router } = require('express')
const { check } = require('express-validator')

const { getCategories, createCategories, getCategorie, updateCategorie, deleteCategorie } = require('../controllers/categories')
const { existCategorie } = require('../helpers/dbvalidators')
const { isAdminRole } = require('../middlewares/isadminrole')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validatejwt')


const router = Router()

router.get('/', getCategories )

router.get('/:id', [
	check('id', 'El ID no es valido').isMongoId(),
	check('id').custom( existCategorie ),
	validateFields
	], getCategorie )

router.post('/', [
	validateJWT,
	check('nombre', 'El nombre es obligatorio').not().isEmpty(),
	validateFields
	], createCategories)

router.put('/:id', [
	validateJWT,
	check('id', 'El ID no es valido').isMongoId(),
	check('id').custom( existCategorie ),
	check('nuevo_nombre', 'El nuevo nombre de la categoria es requerido').not().isEmpty(),
	validateFields
	], updateCategorie )

router.delete('/:id', [
	validateJWT,
	isAdminRole,
	check('id', 'El ID no es valido').isMongoId(),
	check('id').custom( existCategorie ),
	validateFields
	], deleteCategorie )


module.exports = router
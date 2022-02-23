const { Router } = require('express')
const { check } = require('express-validator')

const { usersGet, usersPut, usersPost, usersDelete, usersPatch } = require('../controllers/users')

const { isAdminRole } = require('../middlewares/isadminrole')
const { roleValidator, emailExistsValidator, idExistsValidator } = require('../helpers/dbvalidators')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validatejwt')

const router = Router()

router.get('/', usersGet)

router.put('/:id', [
	check('id', 'El ID no es valido').isMongoId(),
	check('id').custom( idExistsValidator ),
	check('rol').custom( roleValidator ),
	validateFields
	],usersPut)

router.post('/', [
	check('correo', 'Por favor ingresa un correo valido').isEmail(),
	check('correo').custom( emailExistsValidator ),
	check('nombre', 'El nombre es obligatorio').not().isEmpty(),
	check('password', 'La contraseña es obligatoria').not().isEmpty(),
	check('password', 'La contraseña debe tener almenos 6 caracteres').isLength({ min: 6 }),
	check('rol').custom( roleValidator ),
	validateFields
	],usersPost)

router.delete('/:id', [
	validateJWT,
	isAdminRole,
	check('id', 'El ID no es valido').isMongoId(),
	check('id').custom( idExistsValidator ),
	validateFields
	],usersDelete)

router.patch('/', usersPatch)

module.exports = router
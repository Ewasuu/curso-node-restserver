const { Router } = require('express')
const { check } = require('express-validator')

const { login, googleSignIn } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validateFields')

const router = Router()

router.post('/login', [
	check('correo', 'Por favor ingrese un correo valido').isEmail(),
	check('password', 'Por favor ingrese una contraseña').not().isEmpty(),
	validateFields
	], login)

router.post('/google', [
	check('id_token', 'ID token en necesario').not().isEmpty(),
	validateFields
	], googleSignIn)

module.exports = router
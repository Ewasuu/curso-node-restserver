const { Router } = require('express')
const { check } = require('express-validator')


const { search } = require('../controllers/search')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validatejwt')


const router = Router()

router.get('/:coleccion/:termino', search )


module.exports = router

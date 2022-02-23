


const isAdminRole = (req, res, next) => {

	if (!req.authenticatedUser) {
		return res.status(500).json({
			msg: 'No existe un usuario autenticado para verificar su rol'
		})
	}

	const { rol, nombre } = req.authenticatedUser

	if (rol !== 'ADMIN_ROLE') {
		res.status(401).json({
			msg: `El usuario ${nombre} no tiene permiso para realizar esta accion`
		})
	}

	next()
}

module.exports = {
	isAdminRole
}
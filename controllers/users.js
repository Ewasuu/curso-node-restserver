
const usersGet = (req, res) => {
	res.json({
		msg: 'Get - controller'
	})
}

const usersPut = (req, res) => {
	let { id } = req.params

	res.json({
		msg: 'Put - controller',
		id
	})
}

const usersPost = (req, res) => {
	body = req.body

	res.json({
		msg: 'Post - controller',
		body
	})
}
const usersDelete = (req, res) => {
	res.json({
		msg: 'Delete - controller'
	})
}

const usersPatch = (req, res) => {
	res.json({
		msg: 'Patch - controller'
	})
}

module.exports = {
	usersGet,
	usersPut,
	usersPost,
	usersDelete,
	usersPatch
}
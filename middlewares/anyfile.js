

const anyFile = (req, res, next) => {

	if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
	    res.status(400).json({ msg: 'No se esta subiendo ningun archivo'});
	    return;
	}

	next()
}

module.exports = {
	anyFile
}
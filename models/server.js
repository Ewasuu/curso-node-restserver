const express = require('express')
const cors = require('cors')

class Server {

	constructor(){

		this.app = express()
		this.port = process.env.PORT
		this.usuariosPath = '/api/users'

		//Middlewares
		this.middlewares()

		//Rutas de mi aplicacion
		this.routes()
	}

	middlewares(){

		//Directorios
		this.app.use( express.static('public') )

		//Parseo y lectura
		this.app.use( express.json() )

		//Cors
		this.app.use( cors() )

	}

	routes(){
		
		this.app.use( this.usuariosPath, require('../routes/users') )

	}

	listen(){

		this.app.listen( this.port )
	}

}





module.exports = Server
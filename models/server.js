const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config.js')

class Server {

	constructor(){

		this.app = express()
		this.port = process.env.PORT

		this.paths = {
			auth: '/api/auth',
			categories: '/api/categories',
			products: '/api/products',
			search: '/api/search',
			uploads: '/api/uploads',
			users: '/api/users'
		}


		//Conectar a base de datos
		this.conectarDb()

		//Middlewares
		this.middlewares()

		//Rutas de mi aplicacion
		this.routes()
	}

	async conectarDb(){
		await dbConnection()
	}

	middlewares(){

		//Directorios
		this.app.use( express.static('public') )

		//Parseo y lectura
		this.app.use( express.json() )

		//Cors
		this.app.use( cors() )

		//File upload
		this.app.use(fileUpload({
		    useTempFiles : true,
		    tempFileDir : '/tmp/',
		    createParentPath: true
		}))

	}

	routes(){
		
		this.app.use( this.paths.auth, require('../routes/auth') )
		this.app.use( this.paths.categories, require('../routes/categories') )
		this.app.use( this.paths.products, require('../routes/products') )
		this.app.use( this.paths.search, require('../routes/search') )
		this.app.use( this.paths.uploads, require('../routes/upload') )
		this.app.use( this.paths.users, require('../routes/users') )

	}

	listen(){

		this.app.listen( this.port )
	}

}





module.exports = Server
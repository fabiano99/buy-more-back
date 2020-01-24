//import { rejects } from "assert";
import * as restify from 'restify'
import * as mongoose from 'mongoose'
import {environment} from '../common/environment'
import {Router} from '../common/router'
import { produtosRouter } from '../produtos/produtos.router';
//import {mergePatchBodyParser} from './merge-patch.parser'
import {handleError} from './error.handler'
import * as corsMiddleware from 'restify-cors-middleware'
export class Server {

	application!: restify.Server;

	initializeDb(): mongoose.MongooseThenable {
		(<any>mongoose).Promise = global.Promise
		return mongoose.connect(environment.db.url,{
			useMongoClient: true
		})
	}

	initRoutes(routers: Router[]): Promise<any>{
		return new Promise((resolve, reject)=>{
			try{
				
				this.application = restify.createServer({
					name:'api',
					version:'1.0.0'
				})

				const corsOption: corsMiddleware.Options = {
					preflightMaxAge: 86400,
					origins: ["*"],
					allowHeaders:['*'],
					exposeHeaders:['*']
				}

				const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOption)

				this.application.pre(cors.preflight)
				this.application.use(cors.actual)

				this.application.use(restify.plugins.queryParser())
				this.application.use(restify.plugins.bodyParser())
				//this.application.use(mergePatchBodyParser)

				//Routes
				for(let router of routers){
					router.applyRoutes(this.application)
				}
				
				this.application.listen(environment.server.port,()=>{
					resolve(this.application)
				})

				this.application.on('restifyError', handleError)
			
			}catch(error){
				reject(error)
			}
		})
	}

	bootstrap(routers: Router[] = []): Promise<Server>{
		return this.initializeDb().then(()=>
			this.initRoutes([produtosRouter]).then(() => this)
		) 
	}
}
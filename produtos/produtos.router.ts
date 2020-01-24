import {Router} from '../common/router'
import * as restify from 'restify'
import { response } from 'spdy';
import {Produto} from './produtos.model';
import { NotFoundError } from 'restify-errors';

class ProdutosRouter extends Router{

	constructor(){
		super()
		
	}

	applyRoutes(application: restify.Server){


		application.get('/produtos',(req,resp,next)=>{
			Produto.find().then(this.render(resp, next)).catch(next)
		})

		application.get('/produtos/:codigo',(req, resp, next) =>{
			Produto.findOne({codigo:req.params.codigo}).then(this.render(resp, next)).catch(next)

		})

		application.get('/produtos/nome/:nome',(req, resp, next) =>{
			Produto.find({nome:req.params.nome}).then(this.render(resp, next)).catch(next)

		})

		application.post('/produtos',(req,resp, next)=>{
			let produto = new Produto(req.body)

			produto.save().then(this.render(resp, next)).catch(next)
		})

		application.post('/produtos/alterar/:codigo',(req,resp,next)=>{
			const options = {runValidators:true,overwrite:true}
			Produto.update({codigo:req.params.codigo},req.body,options)
			.then(this.render(resp, next)).catch(next)
		})

		application.post('/produtos/comprar/:codigo',(req,resp,next)=>{
			const options = {runValidators:true,overwrite:true}
			Produto.update({codigo:req.params.codigo},req.body,options)
			.then(this.render(resp, next)).catch(next)
		})


		application.patch('/produtos/alterar/:codigo',(req, resp, next)=>{
			const options = {runValidators:true ,new:true}
			Produto.update({codigo:req.params.codigo}, req.body, options).then(this.render(resp, next)).catch(next)
		})

		application.post('/produtos/apagar/:codigo',(req,resp,next)=>{
			Produto.remove({codigo:req.params.codigo}).exec().then((cmdResult:any)=>{
				if(cmdResult.result.n){
					resp.send(204)
				}else{
					throw new NotFoundError("Produto não encontrado")
				}
				return next()
			}).catch(next)
		})
	}
}

export const produtosRouter = new ProdutosRouter()
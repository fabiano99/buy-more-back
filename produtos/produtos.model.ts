import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
import {environment} from '../common/environment'

export interface Produto extends mongoose.Document{
	codigo:number,
	nome:string,
	icms:number,
	peso:number,
	categoria:string,
	descricao:string,
	precoCusto: number,
	precoVenda: number,
	quantidade:number
}

const userSchema = new mongoose.Schema({
	nome: {
		type: String,
		required: true,
		maxlength: 35,
		minlength: 3
	},
	codigo:{
		type: Number,
		unique: true,
		required:true
	},
	icms:{
		type: Number,
		required: false
	},
	peso:{
		type: Number,
		required: false
	},
	categoria:{
		type: String,
		required: false
	},
	descricao:{
		type: String,
		required: false,
		maxlength:100
	},
	precoCusto:{
		type: Number,
		required: true
	},
	precoVenda:{
		type: Number,
		required: true
	},
	quantidade:{
		type: Number,
		required: true
	}
})

/*
const hashPassword = (obj,next)=>{
	bcrypt.hash(obj.password,environment.security.saltRounds)
		.then(hash=>{
			obj.password = hash
			next()
		}).catch(next)
}

const saveMiddleware = function(next){
	const user: Produto = this
	if(!user.isModified('password')){
		next()
	}else{
		hashPassword(user, next)
	}
}

const updateMiddleware = function(next){
	if(!this.getUpdate().password){
		next()
	}else{
		hashPassword(this.getUpdate(), next)
	}
}

userSchema.pre('save',saveMiddleware)
userSchema.pre('findOneAndUpdate',updateMiddleware)
userSchema.pre('update',updateMiddleware)
*/
export const Produto = mongoose.model<Produto>('Produto',userSchema)
import * as restify from 'restify'
import {Server} from './server/server'
import {produtosRouter} from './produtos/produtos.router'

const server = new Server()
server.bootstrap([produtosRouter]).then(server=>{
    console.log('Server in listening on: ', server.application.address())
}).catch(error=>{
    console.log('Server failed to start')
    console.error(error)
    process.exit(1)
})

/*
server.application.listen(3000,()=>{
    console.log('API is running on http://localhost:3000')
})
*/
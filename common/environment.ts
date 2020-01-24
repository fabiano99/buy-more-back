export const environment = {
	server:{port: process.env.SERV_PORT || 3000},
	db:{url: process.env.DB_URL || 'mongodb://localhost/buy-more'},
	security:{saltRounds: process.env.SAlT_ROUNDS || 10}
}

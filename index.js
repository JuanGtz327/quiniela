const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000; 
const path = require('path');

const app = express();

//Cargar la base de datos
require('./db');

//Vitas del servidor
app.set('views',path.join(__dirname,'views'));
app.engine('hbs',exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'),'layouts'),
	partialsDir: path.join(app.get('views'),'partials'),
	extname: 'hbs'
}));
app.set('view engine','hbs');

app.use(express.urlencoded({extended:false}));

app.use(session({
	secret: "MyQuinielaApp",
	resave: true,
	saveUninitialized: true,
}));

app.use(flash());

app.use((req,res,next)=>{
	res.locals.err_msg=req.flash('err_msg');
	res.locals.suc_msg=req.flash('suc_msg');
	next();
});
//Rutas del servidor
app.use(require('./routes/router'));

//Rutas Estaticas
app.use('/static',express.static(__dirname + '/public'));

app.listen(PORT,()=>{
	console.log('Server listening on port 5000');
});
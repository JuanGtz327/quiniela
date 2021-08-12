const MainController = {};

const User = require('../models/User');
const Quiniela = require('../models/Quiniela');

MainController.home = (req,res)=>{
	res.render('index');
};

MainController.signIn = (req,res)=>{
	res.render('signin');
};

MainController.signInUser = async(req,res)=>{
	const errors = [];
	const {username,password,confirm_password,age,team} = req.body;
	if (password!=confirm_password){
		errors.push({text:'Las contraseñas no coinciden'});
	}
	if (password.length<8){
		errors.push({text:'La contraseña debe contener al menos 8 caracteres'});
	}
	if (age<0 || age>100){
		errors.push({text:'Edad no valida'});
	}
	if (team=='Seleccionar'){
		errors.push({text:'Selecciona un equipo'});
	}
	if (errors.length>0) {
		res.render('signin',{
			username,
			password,
			confirm_password,
			age,
			team,
			errors
		});
	}
	else{
		const UserExist = await User.findOne({username});
		if (UserExist){
			req.flash('err_msg','El nombre de usuario ya esta seleccionado');
			res.redirect('/signin');
		}else{
			const user = new User({username,password,age,team});
			await user.save();
			req.flash('suc_msg',"El registro se completo exitosamente");
			res.redirect('/');
		}
	}
};

MainController.logIn = (req,res)=>{
	res.render('login');
};

module.exports = MainController;
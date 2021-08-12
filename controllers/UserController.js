const UserController = {};

const ta = require('timeago.js');

const Quiniela = require('../models/Quiniela');

UserController.userMain = async (req,res)=>{
	const quinielas = await Quiniela.find().lean();
	const timeQuinielas = quinielas.map(e=>{
		e.timeago = ta.format(e.createdAt);
		return e;
	});
	if (quinielas) {
		res.render('user/userHome',{quinielas,timeQuinielas});
	}else {
		res.render('user/userHome');	
	}
}

UserController.unirQuiniela = async (req,res)=>{
	const quiniela = await Quiniela.findById(req.params.id).lean();
	if (quiniela) {
		const {usuarios} = quiniela;
		let exist = 0;
		usuarios.map(user=>{
			if(user==='iddelusuario');
				exist=1;
		})
		if (exist!=1){ 
			usuarios.push('iddelusuario')	;
			await Quiniela.findByIdAndUpdate(req.params.id, { usuarios });
		}else
			console.log('Usuario ya registrado')		
		res.redirect('/user');
	}else {
		res.redirect('/user');	
	}
}

UserController.mainIndex = async(req,res)=>{
	const quinielas = await Quiniela.find({ usuarios: 'iddelusuario' });
	if (quinielas) {
		console.log(quinielas.nombre)
		res.render('indexPage',{quinielas});	
	}else{
		res.render('indexPage');
	}
}

module.exports = UserController;
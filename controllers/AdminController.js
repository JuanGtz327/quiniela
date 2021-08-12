const AdminController = {};

const ta = require('timeago.js');

const Quiniela = require('../models/Quiniela');

AdminController.adminMain = async(req,res)=>{
	const quinielas = await Quiniela.find().lean();
	const timeQuinielas = quinielas.map(e=>{
		e.timeago = ta.format(e.createdAt);
		return e;
	});
	if (quinielas) {
		res.render('admin/adminHome',{quinielas,timeQuinielas});
	}else {
		res.render('admin/adminHome');	
	}
};

AdminController.iniciarQuiniela = (req,res)=>{
	const { nombreQuiniela,tipoQuiniela } = req.body;
	if (tipoQuiniela=='jornada')
		res.render('admin/crearQuiniela',{nombreQuiniela,tipoQuiniela,jornadaExist:true});
	else if(tipoQuiniela=='liguilla' || tipoQuiniela=='cuartos')
		res.render('admin/crearQuiniela',{nombreQuiniela,tipoQuiniela,ligcuarExist:true});
	else if(tipoQuiniela=='semifinal' || tipoQuiniela=='final')
		res.render('admin/crearQuiniela',{nombreQuiniela,tipoQuiniela,seminal:true});
};

AdminController.crearQuiniela = async(req,res)=>{
	const {nombreQuiniela,tipoQuiniela} = req.body;
	const {enc1,enc2,enc3,enc4,enc5,enc6,enc7,enc8,enc9} = req.body;
	const {est1,est2,est3,est4,est5,est6,est7,est8,est9} = req.body;
	const encs = [];
	const usuariosQuiniela = [];
	encs.push(enc1);
	encs.push(enc2);
	encs.push(enc3);
	encs.push(enc4);
	encs.push(enc5);
	encs.push(enc6);
	encs.push(enc7);
	encs.push(enc8);
	encs.push(enc9);
	const ests = [];
	ests.push(est1);
	ests.push(est2);
	ests.push(est3);
	ests.push(est4);
	ests.push(est5);
	ests.push(est6);
	ests.push(est7);
	ests.push(est8);
	ests.push(est9);
	if (tipoQuiniela=='jornada') {
		const arrEncuentros = [];
		for (let i = 0; i < 9; i++) {
			const encuentro = {};
			encuentro.encuentro = encs[i];
			encuentro.resultado = ests[i];
			arrEncuentros.push(encuentro);
		}
		const quiniela = new Quiniela({nombre:nombreQuiniela,tipo:tipoQuiniela,encuentros:arrEncuentros,usuarios:usuariosQuiniela});
		await quiniela.save();
		req.flash('suc_msg',"La quiniela se registro exitosamente");
		res.redirect('/admin');
	}else if (tipoQuiniela=='liguilla' || tipoQuiniela=='cuartos') {
		const arrEncuentros = [];
		for (let i = 0; i < 4; i++) {
			const encuentro = {};
			encuentro.encuentro = encs[i];
			encuentro.resultado = ests[i];
			arrEncuentros.push(encuentro);
		}
		const quiniela = new Quiniela({nombre:nombreQuiniela,tipo:tipoQuiniela,encuentros:arrEncuentros,usuarios:usuariosQuiniela});
		await quiniela.save();
		req.flash('suc_msg',"La quiniela se registro exitosamente");
		res.redirect('/admin');
	}else if (tipoQuiniela=='semifinal' || tipoQuiniela=='final') {
		const arrEncuentros = [];
		for (let i = 0; i < 2; i++) {
			const encuentro = {};
			encuentro.encuentro = encs[i];
			encuentro.resultado = ests[i];
			arrEncuentros.push(encuentro);
		}
		const quiniela = new Quiniela({nombre:nombreQuiniela,tipo:tipoQuiniela,encuentros:arrEncuentros,usuarios:usuariosQuiniela});
		await quiniela.save();
		req.flash('suc_msg',"La quiniela se registro exitosamente");
		res.redirect('/admin');
	}else {
		res.redirect('/')
	}
};

AdminController.editarQuiniela = async(req,res)=>{
	const quiniela = await Quiniela.findById(req.params.id).lean();
	if (quiniela) {
		const {_id,nombre,tipo,encuentros} = quiniela;
		let en1,en2,en3,en4,en5,en6,en7,en8,en9;
		en1=encuentros[0];
		en2=encuentros[1];
		en3=encuentros[2];
		en4=encuentros[3];
		en5=encuentros[4];
		en6=encuentros[5];
		en7=encuentros[6];
		en8=encuentros[7];
		en9=encuentros[8];
		if (tipo=='jornada')
			res.render('admin/editarQuiniela',{_id,nombre,en1,en2,en3,en4,en5,en6,en7,en8,en9,jornadaExist:true});
		else if(tipo=='liguilla' || tipo=='cuartos')
			res.render('admin/editarQuiniela',{_id,nombre,en1,en2,en3,en4,en5,en6,en7,en8,en9,ligcuarExist:true});
		else if(tipo=='semifinal' || tipo=='final')
			res.render('admin/editarQuiniela',{_id,nombre,en1,en2,en3,en4,en5,en6,en7,en8,en9,seminal:true});
	}else {
		res.render('admin/editarQuiniela');	
	}
};

AdminController.editarQuinielaPost = async(req,res)=>{
	const {nombreQuiniela,tipoQuiniela} = req.body;
	const {enc1,enc2,enc3,enc4,enc5,enc6,enc7,enc8,enc9} = req.body;
	const {est1,est2,est3,est4,est5,est6,est7,est8,est9} = req.body;
	const encs = [];
	encs.push(enc1);
	encs.push(enc2);
	encs.push(enc3);
	encs.push(enc4);
	encs.push(enc5);
	encs.push(enc6);
	encs.push(enc7);
	encs.push(enc8);
	encs.push(enc9);
	const ests = [];
	ests.push(est1);
	ests.push(est2);
	ests.push(est3);
	ests.push(est4);
	ests.push(est5);
	ests.push(est6);
	ests.push(est7);
	ests.push(est8);
	ests.push(est9);
	const arrEncuentros = [];
	for (let i = 0; i < 9; i++) {
		const encuentro = {};
		encuentro.encuentro = encs[i];
		encuentro.resultado = ests[i];
		arrEncuentros.push(encuentro);
	}
	await Quiniela.findByIdAndUpdate(req.params.id, { encuentros:arrEncuentros });
	req.flash('suc_msg',"La quiniela se actualizo exitosamente");
	res.redirect('/admin');
}

AdminController.eliminarQuiniela = async(req,res)=>{
	await Quiniela.findByIdAndDelete(req.params.id);
	req.flash("suc_msg", "Se elimino la quiniela exitosamente");
	res.redirect("/admin");
};

module.exports = AdminController;
const express = require('express');
const router = express.Router();

const { home,signIn,logIn,signInUser } = require('../controllers/MainController');
const { adminMain,iniciarQuiniela,crearQuiniela,editarQuiniela,editarQuinielaPost,eliminarQuiniela } = require('../controllers/AdminController');
const { userMain,unirQuiniela,mainIndex } = require('../controllers/UserController');

//Main Routes
router.get('/',home);
router.get('/signin',signIn);
router.post('/signin',signInUser);
router.get('/login',logIn);

//Admin Routes
router.get('/admin',adminMain);
router.post('/admin/iniciarquiniela',iniciarQuiniela);
router.post('/admin/crearQuiniela',crearQuiniela);
router.get('/admin/editarQuiniela/:id',editarQuiniela);
router.post('/admin/editarQuiniela/:id',editarQuinielaPost);
router.post('/admin/eliminarQuiniela/:id',eliminarQuiniela);

//User Routes
router.get('/user',userMain)
router.post('/user/unirQuiniela/:id',unirQuiniela)
router.get('/user/homePage',mainIndex);

module.exports = router;
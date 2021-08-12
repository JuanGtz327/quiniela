const {Schema,model} = require('mongoose');

const quinielaSchema = new Schema({
	nombre: {type:String,required:true},
	tipo: {type:String,required:true},
	encuentros: {type:Array,required:true},
	usuarios: {type:Array,required:true},
},{
	timestamps: true,
});

module.exports = model('Quiniela',quinielaSchema);
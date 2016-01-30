/**
 * TransaccionController
 *
 * @description :: Server-side logic for managing transaccions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//'post /transaccion'           : 'TransaccionController.addnew',
	addnew: function(req,res){
		Transaccion.add(req.body).then(function(r){
			if(!r.succes){
				res.jsonp(500,r);
			}else{
				res.jsonp(201,r);
			}
		});
	},

	//'get  /transaccion/:uuid'     : 'TransaccionController.profile',
	profile: function(req,res){
		Transaccion.profile({id:req.param('uuid')}).then(function(r){
			if(!r.succes){
				res.jsonp(500,r);
			}else{
				res.jsonp(202,r);
			}
		});
	},


	//'get  /transacciones'         : 'TransaccionController.viewall'
	viewall: function(req,res){
		Transaccion.search({active:1}).then(function(r){
			if(!r.succes){
				res.jsonp(500,r);
			}else{
				res.jsonp(202,r);
			}
		});
	}
};

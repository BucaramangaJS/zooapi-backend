/**
 * AnimalController
 *
 * @description :: Server-side logic for managing animals
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//'post /animal'               : 'AnimalController.addnew',
	addnew: function(req,res){
		Animal.add(req.body).then(function(r){
			if(!r.succes){
				res.jsonp(500,r);
			}else{
				res.jsonp(201,r);
			}
		});
	},

	//'post /animal/:uuid'         : 'AnimalController.edit',
	edit: function(req,res){
		Animal.edit(req.body,req.param('uuid')).then(function(r){
			if(!r.succes){
				res.jsonp(500,r);
			}else{
				res.jsonp(202,r);
			}
		});
	},

	//'get  /animal/delete/:uuid'  : 'AnimalController.inactivate',
	inactivate: function(req,res){
		Animal.edit({active:0},req.param('uuid')).then(function(r){
			if(!r.succes){
				res.jsonp(500,r);
			}else{
				res.jsonp(202,r);
			}
		});
	},

	//'get  /animales'             : 'AnimalController.viewall',
	viewall: function(req,res){
		Animal.search({active:1}).then(function(r){
			if(!r.succes){
				res.jsonp(500,r);
			}else{
				res.jsonp(202,r);
			}
		});
	},

	//'get  /animal/:uuid'         : 'AnimalController.profile',
	profile: function(req,res){
		Animal.profile({id:req.param('uuid')}).then(function(r){
			if(!r.succes){
				res.jsonp(500,r);
			}else{
				res.jsonp(202,r);
			}
		});
	}
};

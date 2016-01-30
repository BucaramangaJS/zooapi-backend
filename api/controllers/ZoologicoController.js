/**
 * ZoologicoController
 *
 * @description :: Server-side logic for managing zoologicoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//'post /zoo'               : 'ZoologicoController.addnew',
	addnew: function(req,res){
		Zoologico.add(req.body).then(function(r){
			if(!r.succes){
				res.jsonp(500,r);
			}else{
				res.jsonp(201,r);
			}
		});
	},

	//'post /zoo/:uuid'         : 'ZoologicoController.edit',
	edit: function(req,res){
		Zoologico.edit(req.body,req.param('uuid')).then(function(r){
			if(!r.succes){
				res.jsonp(500,r);
			}else{
				res.jsonp(202,r);
			}
		});
	},

	//'get  /zoo/delete/:uuid'  : 'ZoologicoController.inactivate',
	inactivate: function(req,res){
		Zoologico.edit({active:0},req.param('uuid')).then(function(r){
			if(!r.succes){
				res.jsonp(500,r);
			}else{
				res.jsonp(202,r);
			}
		});
	},

	//'get  /zoos'              : 'ZoologicoController.viewall',
	viewall: function(req,res){
		Zoologico.search({active:1}).then(function(r){
			if(!r.succes){
				res.jsonp(500,r);
			}else{
				res.jsonp(202,r);
			}
		});
	},

	//'get  /zoo/:uuid'         : 'ZoologicoController.profile',
	profile: function(req,res){
		Zoologico.profile({id:req.param('uuid')}).then(function(r){
			if(!r.succes){
				res.jsonp(500,r);
			}else{
				res.jsonp(202,r);
			}
		});
	},
};

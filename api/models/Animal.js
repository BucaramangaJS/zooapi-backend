/**
* Animal.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },

    active: {
      type: 'integer',
      defaultsTo: 1,
      enum: [0,1]
    },

    nombre:{
      type: 'string'
    },
    foto:{
      type: 'string'
    },
    especie:{
      type: 'string'
    },
    precio:{
      type: 'integer'
    },
    en_venta:{
      type: 'boolean'
    },
    zoo:{
      type: 'string',
      index: true,
			model: 'zoologico',
			defaultsTo: 0
    },
    transacciones:{
      collection: 'transaccion',
			via: 'animal'
    }
  },

  //create an uuid for the object before creating a new record
  beforeCreate: function (values, cb) {
      var uuid        = require('node-uuid');
      values.id       = uuid.v4();
      cb();
  },

  //make sure the uuid gets removed before update
  beforeUpdate: function (values, cb) {
      if(values.id){
        delete values.id;
      }
      cb();
  },

  /*
  'post /animal'               : 'AnimalController.addnew',
  'post /animal/:uuid'         : 'AnimalController.edit',
  'get  /animal/delete/:uuid'  : 'AnimalController.inactivate',
  'get  /animales'             : 'AnimalController.viewall',
  'get  /animal/:uuid'         : 'AnimalController.profile',
  */

  add: function(data){
    //create
    return Animal.create(data)
    //populate
    .then(function(e){
      return Animal.findOne({id:e.id})
      .populate('zoo')
      .populate('transacciones',{active:1});
    })
    //response data
    .then(function(e){
      return {succes: true, data: e};
    })

    //error management
    .catch(function(e){
      console.log(e);
      return {succes: false, data: 'Hubo un error creando el Animal'};
    });
  },

  edit: function(data,id){
      //update
      return Animal.update({id:id},data)

      //populate
      .then(function(e){
        return Animal.findOne({id:e[0].id})
        .populate('zoo')
        .populate('transacciones',{active:1});
      })

      //response data
      .then(function(e){
        return {succes: true, data: e};
      })

      //error management
      .catch(function(e){
        console.log(e);
        return {succes: false, data: 'Hubo un error editando el Animal'};
      });
  },

  search: function(data){
    return Animal.find(data)
    .populate('zoo')
    .populate('transacciones',{active:1})

    //response data
    .then(function(e){
      return {succes:true, data:e};
    })
    //error management
    .catch(function(){
      return {succes:false, data: 'Ups.. algo se rompió en la busqueda de animales.'};
    });
  },

  profile: function(data){
    return Animal.findOne(data)
    .populate('zoo')
    .populate('transacciones',{active:1})

    //response data
    .then(function(e){
      return {succes:true, data:e};
    })
    //error management
    .catch(function(){
      return {succes:false, data: 'Ups.. algo se rompió en el perfil del Animal.'};
    });
  }
};

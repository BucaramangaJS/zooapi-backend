/**
* Transaccion.js
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
    valor:{
      type: 'float'
    },
    fecha:{
      type: 'date'
    },
    vendedor:{
      type: 'string',
      index: true,
      model: 'zoologico',
      defaultsTo: 0
    },
    comprador:{
      type: 'string',
      index: true,
			model: 'zoologico',
			defaultsTo: 0
    },
    animal:{
      type: 'string',
      index: true,
			model: 'animal',
			defaultsTo: 0
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
  'post /transaccion'           : 'TransaccionController.addnew',
  'get  /transaccion/:uuid'     : 'TransaccionController.profile',
  'get  /transacciones'         : 'TransaccionController.viewall'
  */

  add: function(data){
    //create
    return Transaccion.create(data)
    //populate
    .then(function(e){
      return Transaccion.findOne({id:e.id})
      .populate('vendedor')
      .populate('comprador')
      .populate('animal');
    })
    //response data
    .then(function(e){
      return {succes: true, data: e};
    })

    //error management
    .catch(function(e){
      console.log(e);
      return {succes: false, data: 'Hubo un error creando la transaccion'};
    });
  },

  edit: function(data,id){
      //update
      return Transaccion.update({id:id},data)

      //populate
      .then(function(e){
        return Transaccion.findOne({id:e[0].id})
        .populate('vendedor')
        .populate('comprador')
        .populate('animal');
      })

      //response data
      .then(function(e){
        return {succes: true, data: e};
      })

      //error management
      .catch(function(e){
        console.log(e);
        return {succes: false, data: 'Hubo un error editando la transaccion'};
      });
  },

  search: function(data){
    return Transaccion.find(data)
    .populate('vendedor')
    .populate('comprador')
    .populate('animal')

    //response data
    .then(function(e){
      return {succes:true, data:e};
    })
    //error management
    .catch(function(){
      return {succes:false, data: 'Ups.. algo se rompió mientras buscaba transacciones.'};
    });
  },

  profile: function(data){
    return Transaccion.findOne(data)
    .populate('vendedor')
    .populate('comprador')
    .populate('animal')

    //response data
    .then(function(e){
      return {succes:true, data:e};
    })
    //error management
    .catch(function(){
      return {succes:false, data: 'Ups.. algo se rompió en el zooligico.'};
    });
  }

};

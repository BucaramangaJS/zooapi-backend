/**
* Zoologico.js
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
    direccion:{
      type: 'string'
    },
    ciudad:{
      type: 'string'
    },
    categoria:{
      type: 'string',
      defaultsTo: 'A',
      enum: ['A','B','C']
    },
    foto:{
      type: 'string'
    },
    animales:{
      collection: 'animal',
			via: 'zoo'
    },
    ventas:{
      collection: 'transaccion',
			via: 'vendedor'
    },
    compras:{
      collection: 'transaccion',
			via: 'comprador'
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
    'post /zoo'               : 'ZoologicoController.addnew',
    'post /zoo/:uuid'         : 'ZoologicoController.edit',
    'get  /zoo/delete/:uuid'  : 'ZoologicoController.inactivate',
    'get  /zoos'              : 'ZoologicoController.viewall',
    'get  /zoo/:uuid'         : 'ZoologicoController.profile',
  */

  add: function(data){
    //create
    return Zoologico.create(data)
    //populate
    .then(function(e){
      return Zoologico.findOne({id:e.id})
      .populate('animales',{active:1})
      .populate('ventas')
      .populate('compras');
    })
    //response data
    .then(function(e){
      return {succes: true, data: e};
    })

    //error management
    .catch(function(e){
      console.log(e);
      return {succes: false, data: 'Hubo un error creando el zoologico'};
    });
  },

  edit: function(data,id){
      //update
      return Zoologico.update({id:id},data)

      //populate
      .then(function(e){
        return Zoologico.findOne({id:e[0].id})
        .populate('animales',{active:1})
        .populate('ventas')
        .populate('compras');
      })

      //response data
      .then(function(e){
        return {succes: true, data: e};
      })

      //error management
      .catch(function(e){
        console.log(e);
        return {succes: false, data: 'Hubo un error editando el zoologico'};
      });
  },

  search: function(data){
    return Zoologico.find(data)
    .populate('animales',{active:1})
    .populate('ventas')
    .populate('compras')

    //response data
    .then(function(e){
      return {succes:true, data:e};
    })
    //error management
    .catch(function(){
      return {succes:false, data: 'Ups.. algo se rompió en el zooligico.'};
    });
  },

  profile: function(data){
    return Zoologico.findOne(data)
    .populate('animales',{active:1})
    .populate('ventas')
    .populate('compras')

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

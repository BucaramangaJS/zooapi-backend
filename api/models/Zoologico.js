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
  }
};

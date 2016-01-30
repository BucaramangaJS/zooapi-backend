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
  }
};

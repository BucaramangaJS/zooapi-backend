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
  }
};

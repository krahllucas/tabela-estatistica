/**
 * Dados.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	valor:{
  		type: 'float',
  		required: true
  	},
  	tabela:{
  		model: 'tabela',
  		required: true
  	}
  }
};


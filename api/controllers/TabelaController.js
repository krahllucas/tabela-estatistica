/**
 * TabelaController
 *
 * @description :: Server-side logic for managing tabelas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res, next){
		Tabela.find().sort('id').exec(function tabelaFounded(err, tabelas){
			if(err){
				console.log(JSON.stringify(err));
				return next(err);
			}
			return res.view({ tabelas: tabelas });
		});
	},
	create:function(req, res){
		var tabelaObj={
			nome: req.param('nome')
		};

		Tabela.create(tabelaObj, function(err, tabela){
			return res.redirect('/tabela');
		});
	},
	update:function(req, res, next){
		var tabelaObj={
			nome: req.param('nome')
		};

		Tabela.update(req.param('id'),tabelaObj, function tabelaUpdated(err, tabela){
			return res.redirect('/tabela');
		});
	},
	destroy:function(req,res){
		Tabela.destroy(req.param('id'), function tabelaDestroy(err, tabela){
			return res.redirect('/tabela');
		});
	}
};


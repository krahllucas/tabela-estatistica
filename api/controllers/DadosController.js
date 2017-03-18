/**
 * DadosController
 *
 * @description :: Server-side logic for managing dados
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	tabela: function(req, res, next){
		Tabela.findOne(req.param('id')).exec(function tabelaFounded(err, tabela){
			Dados.find({tabela: req.param('id')}).sort('valor').exec(function dadosFounded(err, dados){
				return res.view({ dados: dados, tabela: tabela });
			});
		});
	},
	create:function(req, res){
		var dadoObj={
			valor: req.param('valor'),
			tabela: req.param('tabela')
		};

		Dados.create(dadoObj, function(err, dado){
			return res.redirect('/dados/tabela/'+req.param('tabela'));
		});
	},
	update:function(req, res, next){
		var dadoObj={
			valor: req.param('valor'),
			tabela: req.param('tabela')
		};

		Dados.update(req.param('id'),dadoObj, function dadoUpdated(err, dado){
			return res.redirect('/dados/tabela/'+req.param('tabela'));
		});
	},
	destroy:function(req,res){
		Dados.findOne(req.param('id')).populateAll().exec(function dadoFounded(err, dad){
			Dados.destroy(req.param('id'), function dadosDestroy(err, dado){
				return res.redirect('/dados/tabela/'+dad.tabela.id);
			});
		});
	}
};


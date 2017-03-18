/**
 * RelatorioController
 *
 * @description :: Server-side logic for managing relatorios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	tabela: function(req, res, next){
		Tabela.findOne(req.param('id')).exec(function tabelaFounded(err, tabela){
			Dados.find({tabela: req.param('id')}).sort('valor').exec(function dadosFounded(err, dados){
				var dadosArray = [];

				for (var i = 0; i < dados.length; i++) {
					dadosArray.push(dados[i].valor);
				}
				
				var maior = Math.max.apply(null, dadosArray );
				var menor = Math.min.apply(null, dadosArray );
				var at = maior - menor;
				var n = dadosArray.length;
				var i = Math.ceil(1 + (3.3 * Math.log10(n)));
				var h = Math.round(at / i);

				console.log(maior);
				console.log(menor);
				console.log(at);
				console.log(n);
				console.log(i);
				console.log(h);

				var numeroTMP = menor;
				var countfi = 0;
				var FiAnterior = 0;

				var linhas = [];
				for (var j = 0; j < i; j++) {
					var intervaloTmp = numeroTMP +" |-- "+ (numeroTMP+h);
					var XiTmp = ((numeroTMP+(numeroTMP+h))/2);
					for (var ll = 0; ll < dadosArray.length; ll++) {
						if (dadosArray[ll] >= numeroTMP && dadosArray[ll] < (numeroTMP+h) ){
							countfi += 1;		
						}
					}
					var fiTmp = countfi;
					var friTmp = (countfi/n).toFixed(2) + " ("+countfi+"/"+n+")";
					FiAnterior += countfi;
					var FiTmp = FiAnterior;
					var FriTmp = (FiAnterior/n).toFixed(2) + " ("+FiAnterior+"/"+n+")";

					linhas.push({i: j+1, intervalo: intervaloTmp, Xi: XiTmp, fi: fiTmp, fri: friTmp, Fi: FiTmp, Fri: FriTmp })
					//Zera valores
					numeroTMP += h;	
					countfi = 0;
				}
				
				console.log(linhas);
				return res.view({ tabela: tabela, linhas: linhas });
			});
		});
	}
};


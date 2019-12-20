const BeachesEngine = require('../engine/beaches'); //Importo il modulo 'beaches' della cartella engine
const TrafficEngine = require('../engine/traffic'); //Importo il modulo 'traffic' della cartella engine
const ErrorsEngine  = require('../engine/errors'); //Importo il modulo 'errors' della cartella engine

module.exports = (app) => { //Ricevo in ingresso il parametro app che poi esporto con tutte le info relative alle routes

  const beachesPath = '/beaches'; //Definisco una route costante padre per le richieste relative alle spiagge
  const trafficPath = '/traffic'; //Definisco una route costante padre per le richieste relative al traffico

  /********** BEACHES REST APIs **********/
  app.get(beachesPath, BeachesEngine.getBeaches); //Se la chiamata è relativa al path /beaches invoca la funzione 'getBeaches' del file 'beaches.js' in 'Engine'
  app.post(beachesPath, BeachesEngine.createBeach);

  app.get(`${beachesPath}/:id`, BeachesEngine.getBeachById); //Quando trovo :id mi riferisco al fatto che verrà passato un valore dinamico che utilizzerò come parametro
  app.put(`${beachesPath}/:id`, BeachesEngine.editBeach);
  app.delete(`${beachesPath}/:id`, BeachesEngine.deleteBeach);

  /********** TRAFFIC REST APIs **********/
  app.get(`${trafficPath}/:city`, TrafficEngine.getTrafficByCity);

  /********** ERROR HANDLER **********/
  //Aggiungo la specifica di altre funzionalità che adotto nella mia app, in questo caso funzionalità implementate da noi stessi per la gestione degli errori
  app.use(ErrorsEngine.page404); 
  app.use(ErrorsEngine.pageError); 

};

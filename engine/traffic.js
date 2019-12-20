const moment = require('moment'); //Utilizzo un modulo utile per la gestione dell'ora attuale

//Definisco alcune costanti utili per la generazione casuale
const MIN = 1;
const MAX = 100;

const getTrafficByCity = (req, res) => { //Rappresenta la mia funzionalità che simula un'API di informazioni sul traffico
  if (!req.params.city) { //Nel caso in cui la richiesta HTTP non contenga alcun parametro legato alla città gestisco l'errore
    return res.status(400).send({
      error: true,
      message: 'A city is required'
    });
  }
  //In caso positivo ottengo la percentuale di traffico e la restituisco in risposta alla richiesta 
  return res.status(200).send({
    city: req.params.city,
    value: getTrafficPercentage(req.params.city)
  });
};

//Questa funzione mi permette di ottenere in modo pseudo-casuale le informazioni sul traffico di una certa città
const getTrafficPercentage = (city) => {
  const cityCode = [...city]
    .map(x => x.charCodeAt(0))
    .reduce((a, b) => a + b);

  return Math.floor((moment().startOf('hour').unix() / 100 + cityCode) % MAX + MIN);
};

module.exports = {getTrafficByCity}; //Espongo la funzionalità legata all'ottenimento delle info sul traffico

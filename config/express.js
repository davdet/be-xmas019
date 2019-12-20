const express = require('express'); //Utilizzo il modulo 'express'
const cors = require('cors'); //Utilizzo il modulo 'cors', permette di aggiungere le funzionalità per le chiamate cross domain (Cross Origin Resource Sharing)
const cookieParser = require('cookie-parser'); //Utilizzo il modulo 'cookie-parser', necessario per gestire i cookie con Express
const logger = require('morgan'); //Utilizzo il modulo 'morgan', permette varie operazioni di logging come ad esempio gestire il log di errori e richieste

module.exports = (app) => { //'app' è il parametro che abbiamo passato dal file 'app.js', ma di fatto viene esportato e sarà visibile agli altri moduli

  //Specifico quali funzionalità, precedentemente importate, la mia app express utilizza
  app.use(logger('dev')); //Gestione del logging
  app.use(express.json()); //Permette il parsing dei file json
  app.use(express.urlencoded({ extended: false })); //Permette il parsing dell'url usando query string
  app.use(cookieParser()); //Permette il parsing dei cookie
  app.use(cors()); //Utilizza le cors
  
};
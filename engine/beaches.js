const Beaches = require('../models/index').Beaches;

const getBeaches = async (req, res) => { //Async ci permette di gestire in modo asincrono le richieste
  /*Express invia due parametri che vengono chiamati per convenzione req e res.
  Rappresentano due oggetti separati. Req (request) è la richiesta HTTP. Ci fornisce tutte le informazioni
  relative alla richiesta (parametri, header, ecc) che viene fatta dal client al server. Res (response), rapprenta la risposta al client. */
  let beaches; //Variabile locale relativa alle spiagge

  //findAll(), findOne(), ecc sono tutte chiamate realtive al modulo sequilize (vedi documentazione specifica)
  try {
    beaches = await Beaches.findAll({}); //Nel momento in cui tutte le spiagge sono state trovate veongono assegnate alla variabile 'beaches'
  } catch (error) { //Nel caso in cui sia stata lanciata qualche eccezione la gestisco
    return res.status(500).send(error) //Invio una risposta includendo il codice di errore, 500 è un codice di stato HTTP (Messaggio di errore generico senza alcun dettaglio), vedi elenco stati HTTP per maggiori dettagli.
  }

  return res.status(200).send(beaches); //Se tutto è andato a buon fine incorporo nella risposta le spiagge e la invio al client
};

const getBeachById = async (req, res) => {
  const beachId = req.params.id; //Recupero l'id passato come parametro
  let beach;

  try {
    beach = await Beaches.findOne({where: {id: beachId}});
  } catch (error) {
    return res.status(500).send(error);
  }

  if (!beach) { //Nel caso in cui non sia stata trovata alcuna spiaggia (beach sarà null) restituisco come risposta un errore
    return res.status(404).send({
      error: true, //Posso aggiungere info alla mia risposta indicando maggiori info sull'errore
      message: 'The beach requested does not exist.',
      beachId
    })
  }
  //In caso contrario restituisco la spiaggia
  return res.status(200).send(beach);
};

const createBeach = async (req, res) => {
  const bodyBeach = req.body;
  let beach;

  try {
    beach = await Beaches.create({...bodyBeach});
  } catch (error) {
    return res.status(500).send(error);
  }

  return res.status(201).send(beach);
};

const editBeach = async (req, res) => {
  const beachId = req.params.id;
  const beach = req.body;
  let beachFound, updated;

  try {
    beachFound = await Beaches.findOne({where: {id: beachId}});

    if (!beachFound) {
      return res.status(404).send({
        error: true,
        message: 'Cannot update a beach that does not exist.',
        beachId
      })
    }

    updated = await Beaches.update({...beach}, {where: {id: beachId}});

  } catch (error) {
    return res.status(500).send(error);
  }

  //Dopo aver fatto l'operazione di update dovrei trovare in 'updated' 1 solo elemento
  return updated.pop() === 1

    ? res.status(201).send({ //Nel caso in cui tutto sia andato a buon fine e trovo quindi un elemento allora invio una risposta di esito positivo
      updated: true,
      beachId
    })

    : res.status(400).send({ //Nel caso qualcosa non sia andato bene allora restituisco un codice di errore (400 codice di stato HTTP: la richiesta non può essere soddisfatta a causa di errori di sintassi) 
      updated: false,
      beachId
    });
};

const deleteBeach = async (req, res) => {
  const beachId = req.params.id;
  let response;

  try {
    response = await Beaches.destroy({where: {id: beachId}});
  } catch (error) {
    return res.status(500).send(error);
  }

  return res.status(204).send({}); //204 codice di stato http: il server ha processato con successo la richiesta e non restituirà nessun contenuto.
};

//Espongo tutte le funzionalità che voglio rendere utilizzabili dal mio sistema 
module.exports = {
  getBeaches,
  getBeachById,
  editBeach,
  deleteBeach,
  createBeach
};

const Reservations = require('../models/index').Reservations;

const getReservations = async (req, res) => { 
  let reservations; //Variabile locale relativa alle prenotazioni

  //findAll(), findOne(), ecc sono tutte chiamate realtive al modulo sequilize (vedi documentazione specifica)
  try {
    reservations = await Reservations.findAll({}); //Nel momento in cui tutte le prenotazioni sono state trovate veongono assegnate alla variabile 'reservations'
  } catch (error) { //Nel caso in cui sia stata lanciata qualche eccezione la gestisco
    return res.status(500).send(error) //Invio una risposta includendo il codice di errore, 500 è un codice di stato HTTP (Messaggio di errore generico senza alcun dettaglio), vedi elenco stati HTTP per maggiori dettagli.
  }

  return res.status(200).send(reservations); //Se tutto è andato a buon fine incorporo nella risposta le spiagge e la invio al client
};

const getReservationByEmail = async (req, res) => {
  const emailReservation = req.params.email; //Recupero l'email passata come parametro
  let reservation;

  try {
    reservation = await Reservations.findOne({where: {email: emailReservation}});
  } catch (error) {
    return res.status(500).send(error);
  }

  if (!reservation) { //Nel caso in cui non sia stata trovata alcuna prenotazione (reservation sarà null) restituisco come risposta un errore
    return res.status(404).send({
      error: true, //Posso aggiungere info alla mia risposta indicando maggiori info sull'errore
      message: 'The reservation requested does not exist.',
      emailReservation
    })
  }
  //In caso contrario restituisco la prenotazione
  return res.status(200).send(reservation);
};

const getReservationById = async (req, res) => {
  const reservationId = req.params.idReservation; //Recupero l'email passata come parametro
  let reservation;

  try {
    reservation = await Reservations.findOne({where: {idReservation: reservationId}});
  } catch (error) {
    return res.status(500).send(error);
  }

  if (!reservation) { //Nel caso in cui non sia stata trovata alcuna prenotazione (reservation sarà null) restituisco come risposta un errore
    return res.status(404).send({
      error: true, //Posso aggiungere info alla mia risposta indicando maggiori info sull'errore
      message: 'The reservation requested does not exist.',
      reservationId
    })
  }
  //In caso contrario restituisco la prenotazione
  return res.status(200).send(reservation);
};

const addReservation = async (req, res) => {
  const bodyReservation = req.body;
  let reservation;
  
  try {
    reservation = await Reservations.create({...bodyReservation});
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
  console.log(reservation);
  return res.status(201).send(reservation);
};

const editReservation = async (req, res) => {
  const idReserv = req.params.idReservation;    //rimettere idReservation al posto di email
  const reservation = req.body;
  let reservationFound, updated;

  try {
    reservationFound = await Reservations.findOne({where: {idReservation: idReserv}});

    if (!reservationFound) {
      return res.status(404).send({
        error: true,
        message: 'Cannot update a reservation that does not exist.',
        idReserv
      })
    }

    updated = await Reservations.update({...reservation}, {where: {idReservation: idReserv}});

  } catch (error) {
    return res.status(500).send(error);
  }

  //Dopo aver fatto l'operazione di update dovrei trovare in 'updated' 1 solo elemento
  return updated.pop() === 1

    ? res.status(201).send({ //Nel caso in cui tutto sia andato a buon fine e trovo quindi un elemento allora invio una risposta di esito positivo
      updated: true,
      idReserv
    })

    : res.status(400).send({ //Nel caso qualcosa non sia andato bene allora restituisco un codice di errore (400 codice di stato HTTP: la richiesta non può essere soddisfatta a causa di errori di sintassi) 
      updated: false,
      idReserv
    });
};

const deleteReservation = async (req, res) => {
  const emailReservation = req.params.email;      //rimettere idReservation al posto di email
  let response;

  try {
    response = await Reservations.destroy({where: {email: emailReservation}});
  } catch (error) {
    return res.status(500).send(error);
  }

  return res.status(204).send({}); //204 codice di stato http: il server ha processato con successo la richiesta e non restituirà nessun contenuto.
};

const deleteReservationById = async (req, res) => {
  const reservationId = req.params.idReservation;      //rimettere idReservation al posto di email
  let response;

  try {
    response = await Reservations.destroy({where: {idReservation: reservationId}});
  } catch (error) {
    return res.status(500).send(error);
  }

  return res.status(204).send({}); //204 codice di stato http: il server ha processato con successo la richiesta e non restituirà nessun contenuto.
};

//Espongo tutte le funzionalità che voglio rendere utilizzabili dal mio sistema 
module.exports = {
  getReservations,
  getReservationByEmail,
  getReservationById,
  editReservation,
  deleteReservation,
  addReservation,
  deleteReservationById
};

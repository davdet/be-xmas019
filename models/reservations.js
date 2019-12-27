'use strict';

//Gestisco il modello della rappresentazione dei dati in relazione al database, potrei ottenere questo schema in automatico con componenti aggiuntivi o scriverlo da zero in base alla struttura del database
module.exports = (sequelize, DataType) => {
  let Reservations = sequelize.define('Reservations', {
    idReservation: {
      type: DataType.INTEGER(11),
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    idBeach:          DataType.INTEGER(11),
    date:             DataType.DATEONLY,
    name_reservation: DataType.STRING(50),
    email:            DataType.STRING(30),
    mobile:           DataType.STRING(16),
    quantity:         DataType.INTEGER(2),
    half_day:         DataType.BOOLEAN,
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'reservations'
  });

  Reservations.removeAttribute('id');

  // Association to other models (foreign keys)
  Reservations.associate = function (models) {

    Reservations.belongsTo(models.Beaches, {
      foreignKey: 'idBeach',
      sourceKey: 'idBeach'
    }); 
  };

  return Reservations;
};

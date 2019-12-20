'use strict';
//Gestisco il modello della rappresentazione dei dati in relazione al database, potrei ottenere questo schema in automatico con componenti aggiuntivi o scriverlo da zero in base alla struttura del database
module.exports = (sequelize, DataType) => {
  let Beaches = sequelize.define('Beaches', {
    // id missing because Sequelize adds it by default
    name:            DataType.STRING(100),
    city:            DataType.STRING(40),
    province:        DataType.STRING(2),
    latitude:        DataType.FLOAT,
    longitude:       DataType.FLOAT,
    orientation:     DataType.STRING(5),
    park:            DataType.BOOLEAN,
    food_service:    DataType.BOOLEAN,
    lifeguard:       DataType.BOOLEAN,
    dogs_allowed:    DataType.BOOLEAN,
    summer_crowding: DataType.BOOLEAN,
    photo:           DataType.STRING(255)
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'beaches'
  });

  // Association to other models (foreign keys)
  Beaches.associate = function (models) {

  };

  return Beaches;
};

'use strict';

//Gestisco il modello della rappresentazione dei dati in relazione al database, potrei ottenere questo schema in automatico con componenti aggiuntivi o scriverlo da zero in base alla struttura del database
module.exports = (sequelize, DataType) => {
  let Beaches = sequelize.define('Beaches', {
    idBeach: {
      type: DataType.INTEGER(11),
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
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
    photo:           DataType.STRING(255),
    beach_service:   DataType.BOOLEAN
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'beaches'
  });

  Beaches.removeAttribute('id');

  // Association to other models (foreign keys)
  Beaches.associate = function (models) {

    Beaches.hasOne(models.Reservations, {
      foreignKey: 'idBeach',
      sourceKey: 'idBeach'
    }); 
  };

  return Beaches;
};

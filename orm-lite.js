const Sequelize = require('sequelize');
var connection = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/ormlite';

class Orm{
  constructor(connection, table){
    this.table = table;
    this.sequelize = this.initialize(connection),
    this.model = this.model(this.table);
    this.authentication = this.authentication();
  }

  initialize(connection){
    return new Sequelize(connection);
  }

  authentication(){
    this.sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  }

  model(table){
    console.log('Creating '+ table);
    return this.sequelize.define(table, {
    	firstname: Sequelize.STRING,
    	lastname: Sequelize.STRING
    },
    {freezeTableName: true});
  }

  getAll(callback){
    this.model.sync();
    this.model.findAll().then(function(rows) {
       var data = [];
       for(var i = 0; i < rows.length; i++) {
         data.push(rows[i].dataValues);
       }
       return callback(data);
    });
  }

  findById(id, callback){
    this.model.findAll({
      where: {
        id: id
      }
    }).then(function(rows) {
       var data = [];
       for(var i = 0; i < rows.length; i++) {
         data.push(rows[i].dataValues);
       }
       return callback(data);
    });
  }
}

module.exports = Orm;
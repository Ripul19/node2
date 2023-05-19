const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) =>{
    //can get the link from mongodb cloud server on the website, shop is the database name
    MongoClient.connect('<link>')
    .then(client => {
        console.log('Connected');
        _db = client.db();
        callback();
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb= getDb;
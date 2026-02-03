const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const MONGO_URL = process.env.MONGO_URL

let _db;

const mongoConnect = (callback)=>{
    MongoClient.connect(MONGO_URL)
    .then(client=>{
        _db = client.db('KushwahaKirnaStore');
        console.log('Mongo DB connected');
        callback();
    })
    .catch(error=>{
        console.log("Error while connecting Database", error);
    })
};

const getDb = ()=>{
    if(!_db){
        throw new Error ('Mongo not connected');
    }
    return _db;
};


exports.getDb = getDb;
exports.mongoConnect = mongoConnect;

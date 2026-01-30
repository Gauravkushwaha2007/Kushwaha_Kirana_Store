const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const MONGO_URL = "mongodb+srv://gaurav:<db_password>@cluster0.nco3hgk.mongodb.net/?appName=Cluster0";

let _db;

const mongoConnect = (callback)=>{
    MongoClient.connect(MONGO_URL).then(client=>{
        callback();
        _db = client.db('KushwahaKirnaStore');
    })
    .catch(error=>{
        console.log('Error while connect to MongoDB', error);
    })
};

const getDB = ()=>{
    if(!_db){
        throw new Error ('MongoDB not connected ');
    }
    return _db;
}


exports.getDB = getDB;
exports.mongoConnect = mongoConnect;

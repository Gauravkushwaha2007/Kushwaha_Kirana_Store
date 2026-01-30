const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const MONGO_URL = "mongodb+srv://gaurav:gaurav@cluster0.nco3hgk.mongodb.net/?appName=Cluster0";

let _db;

const mongoConnect = (callback)=>{
    MongoClient.connect(MONGO_URL).then(client=>{
        // console.log(client);
        _db = client.db('KushwahaKirnaStore');
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

var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var dbAddress = 'mongodb://localhost:27017';

function getCollection(dbName, collName, ck) {
    mongoClient.connect(dbAddress, { useNewUrlParser: true }, function(err, conn) {
        if (err) {
            return typeof ck == 'function' && ck(err)
        }
        var db = conn.db(dbName);
        var collection = db.collection(collName);
        typeof ck == 'function' && ck(null, collection)
    })
}
const mongodb = require("mongodb");
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://winnions:franklampard8@cluster0.siqcm.mongodb.net/test";
const urlMongo = "mongodb://localhost:27017";

function registerUser(user, cbErr, cbResults){
    mongoClient.connect(url, function(err, client){
        if(err){
            console.log("Error al iniciar la base de datos. " + err);
            return;
        }

        const dataBae = client.db("tuTurno");
        const selectCollection = dataBae.collection(`users`);

        selectCollection.insertOne(user ,function(err, result){
            client.close();
            if(err){
                cbErr(err);
                return;
            }
            cbResults(result);
        });
    });
}

function registerStadium(stadium, cbErr, cbResults){
    mongoClient.connect(url, function(err, client){
        if(err){
            console.log("Error al conectarse con la base de datos");
            cbErr(err);
            return;
        }

        const dataBase = client.db("tuTurno");
        const selectedCollection = dataBase.collection("stadiums");

        selectedCollection.insertOne(stadium, function(err, result){
            client.close();
            if(err){
                cbErr(err);
                return;
            }

            cbResults(result);
        });
    });
}

function updateOne(collection, id, update1, update2, cbErr, cbResults){
    mongoClient.connect(url, function(err, client){
        if(err){
            console.log("Error al conectarse al servidor");
            return;
        }
         
        const dataBase = client.db("tuTurno");
        const collect = dataBase.collection(collection);

        collect.updateOne(
            { _id: mongodb.ObjectId(id) },
            {
              $set: {
                available: update1,
                taken: update2
              },
            },
            function (err, result) {
              client.close();
      
              if (err) {
                console.log("Hubo un error al consultar:", err);
                cbErr(err);
                return;
              }

              cbResults(result);
            }
          );
    })
}

module.exports = {
    registerUser,
    registerStadium,
    updateOne
}
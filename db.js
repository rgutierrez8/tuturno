const mongodb = require("mongodb");
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://winnions:franklampard8@cluster0.siqcm.mongodb.net/test";
const urlMongo = "mongodb://localhost:27017";

//=================== BUSCAR POR NOMBRE ======================
function searchByName(collection, nombre, cbErr, cbData){
    mongoClient.connect(url, function(err, client){
        if(err){
            console.log("Error al iniciar la base de datos. " + err);
            return;
        }

        const dataBae = client.db("tuTurno");
        const selectCollection = dataBae.collection(`${collection}`);

        selectCollection.find({name: RegExp(nombre)}).toArray(function(err, data){
            client.close();
            if(err){
                cbErr(err);
                return;
            }
            cbData(data);
        });
    });
}

//===================== BUSCAR POR HORA  ======================
function searchByHour(hour, cbErr, cbData){
    mongoClient.connect(url, function(err, client){
        if(err){
            console.log("Error al conectar la base de datos.");
            cbErr(err);
            return;
        }

        const dataBae = client.db("tuTurno");
        const stadiumCollection = dataBae.collection("stadiums");

        stadiumCollection.find({available: hour}).toArray(function(err, data){
            client.close();
            if(err){
                cbErr(err);
                return;
            }
            cbData(data);
        });
    });
}

//=================== BUSCAR POR NOMBRE Y HORA =====================
function searchByNameAndHour(stadiumName, hour, cbErr, cbData){
    mongoClient.connect(url, function(err, client){
        if(err){
            console.log("Error al conectar con la base de datos");
            cbErr(err);
            return;
        }

        const dataBase = client.db("tuTurno");
        const stadiumCollection = dataBase.collection("stadiums");

        stadiumCollection.findOne({name: stadiumName, hour}, function(err, data){
            client.close();
            if(err){
                cbErr(err);
                return;
            }

            cbData(data);
        });
    });
}

//=================== BUSCAR POR ID ==========================
function searchById(collection, id, cbErr, cbData) {
    mongoClient.connect(url, function (err, client) {
      if (err) {
        console.log("Hubo un error conectando con el servidor");
        cbErr(err);
        return;
      }

      const dataBase = client.db("tuTurno");
      const selectedCollection = dataBase.collection(`${collection}`);
  
      selectedCollection.find({ _id: mongodb.ObjectID(id) }).toArray(function (err, data) {
        client.close();
  
        if (err) {
          cbErr(err);
          return;
        }

        cbData(data);
      });
    });
  }

//=================== SIGN UP ====================
function searchByEmail(email, cbErr, cbData){
    mongoClient.connect(url, function(err, client){
        if(err){
            console.log("Error al conectar la base de datos");
            return;
        }

        const dataBase = client.db("tuTurno");
        const selectedCollection = dataBase.collection("users");

        selectedCollection.find({email}).toArray(function(err, data){
            client.close();
            if(err){
                cbErr(err);
                return;
            }

            cbData(data);
        });
    });
}
//=================== LOGIN =======================
function searchUser(usuario, cbErr, cbData){
    mongoClient.connect(url, function(err, client){
        if(err){
            console.log("Error al conectarse con la base de datos", err);
            cbErr(err);
            return;
        }

        const dataBase = client.db("tuTurno");
        const usersCollection = dataBase.collection("users");

        usersCollection.find({username: usuario}).toArray(function(err, data){
            client.close();

            if(err){
                console.log("Error al convertir los datos");
                cbErr(err);
                return;
            };

            cbData(data);
        });
    })
}

//========================== BUSCAR NOMBRE CANCHA ========================
function searchStadium(name, cbErr, cbData){
    mongoClient.connect(url, function(err, client){
        if(err){
            console.log("Error al conectarse con la base de datos", err);
            cbErr(err);
            return;
        }

        const dataBase = client.db("tuTurno");
        const usersCollection = dataBase.collection("stadiums");

        usersCollection.find({name: name}).toArray(function(err, data){
            client.close();

            if(err){
                console.log("Error al convertir los datos");
                cbErr(err);
                return;
            };

            cbData(data);
        });
    })
}

//=========================== BUSCAR CANCHA POR _ID Y NOMBRE ============================
function searchStadiumByIdAndName(stadiumName, id, cbErr, cbData){
    mongoClient.connect(url, function(err, client){
        if(err){
            console.log("Error al conectarse a la base de datos");
            return
        }

        const dataBase = client.db("tuTurno");
        const selectedCollection = dataBase.collection("stadiums");

        selectedCollection.findOne({_id: mongodb.ObjectId(id), name: stadiumName}, function(err, data){
            client.close();
            if(err){
                cbErr(err);
                return;
            }
    
            cbData(data);
        })
    })
}

function searchSortedComments (cbErr, cbData){
    mongoClient.connect(url, function(err, client){
        if(err){
            console.log("Error al conectarse con la base de datos");
            return;
        }

        const dataBase = client.db("tuTurno");
        const collecs = dataBase.collection("comments");

        collecs.find().sort({_id: -1}).limit(6).toArray(function(err, data){
            if(err){
                cbErr(err);
                return;
            }

            cbData(data);
        })
    })
}

module.exports = {
    searchUser,
    searchByName,
    searchByHour,
    searchById,
    searchByNameAndHour,
    searchByEmail,
    searchStadium,
    searchStadiumByIdAndName,
    searchSortedComments
}
const mongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://winnions:franklampard8@cluster0.siqcm.mongodb.net/test";

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
  
      selectedCollection.find({ id: id }).toArray(function (err, data) {
        client.close();
  
        if (err) {
          cbErr(err);
          return;
        }
        console.log(data);
        cbData(data);
      });
    });
  }

//=================== SIGN UP ====================

//=================== LOGIN =======================
function searchUser(usuario, pass, cbErr, cbData){
    mongoClient.connect(url, function(err, client){
        if(err){
            console.log("Error al conectarse con la base de datos");
            cbErr(err);
            return;
        }

        const dataBase = client.db("tuTurno");
        const usersCollection = dataBase.collection("users");

        usersCollection.find({username: usuario, password: pass}).toArray(function(err, data){
            client.close();

            if(err){
                console.log("Error al convertir los datos");
                cbErr(err);
                return;
            };
            console.log(data);
            cbData(data);
        });
    })
}

module.exports = {
    searchUser,
    searchByName,
    searchByHour,
    searchById,
    searchByNameAndHour
}
import MongoClient from '../shared/mongoClient.js';

export default class DenunciationsControler {

  createDenunciations(req, res) { body = '';
    req.on('data',  function (chunk) {
      body += chunk;
    });
    req.on('end', async () => {
      var { latitude, longitude, denuncia, denunciante } = JSON.parse(body);

      const endereco = await getAddress(latitude, longitude);
      const dataToSave = {
        latitude,
        longitude,
        denunciante,
        denuncia,
        endereco
      }

      const collection = db.connection().collection('denunciations');
      collection.insertOne(dataToSave, (err, result) => {
        if(err){
          console.log(err);
        }
        var response = {
          id: result.insertedId,
          data: dataToSave
        }
        res.statusCode = 201;
        res.setHeader('content-Type', 'Application/json');
        res.end(JSON.stringify(response))
      });
    })

  }
  listDenunciations(req, res) {
    const collection = MongoClient.db.collection('denunciations');
    collection.find({}).toArray((err, result) => {
      if (err) throw err;
      res.statusCode = 200;
      res.setHeader('content-Type', 'Application/json');
      res.end(JSON.stringify({data: result}))
    });
  }

};

const cacheInMemory = (() => {
  const cache = {};
  const getCache = url => {
    return cache[url] ? cache[url] : false;
  };
  const addCache = (url, data) => {
    cache[url] = data;
  };
  return {
    getCache,
    addCache
  }
})();
const getAddress = async(latitude, longitude) => {
  const apiKey = 'TGwqnI9ry71X4giA37h8nkK4srsOVL3w';
  const url = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`;

  const inCache = cacheInMemory.getCache(url);
  const address = inCache ? inCache : await httpGet(url);
  if(!inCache){
    cacheInMemory.addCache(url, address);
  }

  const location = address.results[0].locations[0];
  return {
    logradouro: location.street,
    bairro: location.adminArea6,
    cidade: location.adminArea5,
    estado: location.adminArea3,
    pais: location.adminArea4,
    cep: location.postalCode
  }
}

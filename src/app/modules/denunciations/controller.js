const db = require('../utils/mongodb');
const { httpGet } = require('../utils/request');
const interface = require('../utils/mongodb');

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

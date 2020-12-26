import { environment } from '../../../config/environment.js';
import { HttpsClient } from '../shared/index.js';

export default class AddressesService {

  getAddressBasedOnGeoPosition = async(latitude, longitude) => {
    const mapquestEndpoint = `${environment.mapquestUrl}/geocoding/v1/reverse`;
    const apiKey = environment.mapquestApiKey;
    const position = `${latitude},${longitude}`;
    const url = `${mapquestEndpoint}?key=${apiKey}&location=${position}&includeRoadMetadata=true&includeNearestIntersection=true`;

    const inCache = cacheInMemory.getCache(url);
    const address = inCache ? inCache : await HttpsClient.get(url);

    if(!inCache){
      cacheInMemory.addCache(url, address);
    }
    if(!location.adminArea3 && !location.adminArea4 && !location.adminArea5){
      throw null;
    }
    // state //
    // Estado, cidade e país

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

}

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

import { environment } from '../../../config/environment.js';
import { HttpsClient, redisClient } from '../shared/index.js';

export default class AddressesService {

  getAddressBasedOnGeoPosition = async(latitude, longitude) => {
    const mapquestEndpoint = `${environment.mapquestUrl}/geocoding/v1/reverse`;
    const apiKey = environment.mapquestApiKey;
    const position = `${latitude},${longitude}`;
    const url = `${mapquestEndpoint}?key=${apiKey}&location=${position}&includeRoadMetadata=true&includeNearestIntersection=true`;

    const address = await new Promise(res => {
      redisClient.get(url, async (err, data) => {
        const address = !err || !data ? await HttpsClient.get(url) : data ;
        if(err){
          redisClient.set(url,  JSON.stringify(address));
        }
        res(address);
      });
    })

    const location = address.results[0].locations[0];
    if(!location || !location.adminArea3 || !location.adminArea1 || !location.adminArea5){
      return null;
    }

    return {
      logradouro: location.street,
      bairro: location.adminArea6,
      cidade: location.adminArea5,
      estado: location.adminArea3,
      pais: location.adminArea1,
      cep: location.postalCode
    }
  }

}

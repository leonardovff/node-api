import { HttpServer } from '../shared/index.js';
import { AddressesService } from '../addresses/index.js';
import DenunciationsService from './DenunciationsService.js';

export default class DenunciationsControler {
  denunciationsService;
  addressesService;
  constructor(){
    // todo: invert injector dependency?
    this.denunciationsService = new DenunciationsService();
    this.addressesService = new AddressesService();
  }
  async createDenunciations(req, res) {
    const body = await HttpServer.getBody(req, 'json');
    if(!body){
      // TODO: handle
      res.statusCode = 400;
      res.end(JSON.stringify({message: "Request inválido."}));
    }
    const { latitude, longitude, denuncia, denunciante } = body;

    const endereco = await this.addressesService
      .getAddressBasedOnGeoPosition(latitude, longitude)
      .catch(err => {
        console.log(err);
        res.statusCode = 500;
        res.end(JSON.stringify({message: "Endereço não encontrado para essa localidade."}));
      });


    const data = await this.denunciationsService.create({
      latitude, longitude, denuncia, denunciante, endereco
    }).catch(err => {
      res.statusCode = 500;
      res.end(JSON.stringify({message: "Algo aconteceu de errado"}));
    });

    res.statusCode = 201;
    res.end(JSON.stringify(data))
  };

  async listDenunciations(req, res) {
    const data = await this.denunciationsService.list();
    res.statusCode = 200;
    res.end(JSON.stringify({ data: data || [] }));
  }

};

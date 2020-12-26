import DenunciationsControler from './DenunciationsController.js'

const rootPath = '/v1/denuncias';

export default [{
  verify: (req) => req.url == rootPath && req.method === 'GET',
  dispatch: (req, res) => {
    res.setHeader('content-Type', 'Application/json');
    new DenunciationsControler().listDenunciations(req, res)
  }
},
{
  verify: (req) => req.url == rootPath && req.method === 'POST',
  dispatch: (req, res) => {
    res.setHeader('content-Type', 'Application/json');
    new DenunciationsControler().createDenunciations(req, res)
  }
}]

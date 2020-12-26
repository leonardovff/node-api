import DenunciationsControler from './denunciationsController.js'

export default [{
  verify: (req) => req.url == '/users' && req.method === 'GET',
  dispatch: (new DenunciationsControler).listDenunciations
},
{
  verify: (req) => req.url == '/users' && req.method === 'POST',
  dispatch: (new DenunciationsControler).createDenunciations
}]

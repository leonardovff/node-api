import DenunciationsControler from './denunciationsController.js'

const rootPath = '/denunciations';

export default [{
  verify: (req) => req.url == rootPath && req.method === 'GET',
  dispatch: (new DenunciationsControler).listDenunciations
},
{
  verify: (req) => req.url == rootPath && req.method === 'POST',
  dispatch: (new DenunciationsControler).createDenunciations
}]

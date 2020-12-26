const parseJson = (string) => {
  try {

    return JSON.parse(string)
  } catch (e) {
    return null;
  }
}
export default class HttpServer {
  static getBody(req, type) { return new Promise((res, rej) => {
    let body = '';
    req.on('data',  function (chunk) {
      body += chunk;
    });
    req.on('end', async () => {
      // code smell below - need refactory before grow it
      if(type === 'json'){
        body = parseJson(body);
      }
      res(body);
    })
  })};
}

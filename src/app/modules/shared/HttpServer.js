export class HttpServer {
  static getBody(req) { return new Promise((res, rej) => {
    body = '';
    req.on('data',  function (chunk) {
      body += chunk;
    });
    req.on('end', async () => {
    })
  })};
}

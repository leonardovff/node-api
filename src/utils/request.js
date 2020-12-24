const https = require('https');
const httpGet = (url) => new Promise((res, rej) => {
  console.log('entrou fora do cache')
  https.get(url, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      try {
        res(JSON.parse(data));
      } catch (error) {
        res(data);
      }
    });

  }).on("error", (err) => {
    try {
      rej(JSON.parse(err));
    } catch (error) {
      rej(err);
    }
  });
});
module.exports = {
  httpGet
}

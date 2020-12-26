import http from 'http';

import { environment } from '../config/environment.js';
import { App, Routes } from './app.js';

const app = new App();

const server = http.createServer((req, res) => {
  app.router(req, res);
});

server.on('error', (e) => {
  console.error(e);
});

app.bootstrap().then(() => {
  server.listen(environment.port, environment.hostname, () => {
    console.log(`Server running at http://${environment.hostname}:${environment.port}/`);
  });
})

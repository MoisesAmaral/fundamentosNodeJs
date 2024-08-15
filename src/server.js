import http from 'node:http';
import { router } from './router.js';

const server = http.createServer((req, res) => { 
  router(req, res);
});

server.listen(3333, () => {
  console.log('Server is running on port 3333');
});

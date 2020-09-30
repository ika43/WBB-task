
import http from 'http';

import logger from './lib/logger';
import app from './app';

const port: number = parseInt(process.env.SERVER_PORT || '8080', 10);

const server = http.createServer(app);
server.listen(port);

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(`Listening on ${bind}`);
}

server.on('listening', onListening);
const FSEvents = require('fsevents');
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3001 });
const watcher = FSEvents(__dirname);

server.on('connection', (client) => {
  client.on('message', (message) => {
    console.info('[Incoming]', message); // eslint-disable-line

    const reply = 'FileWatcher: Pong';
    client.send(reply);
    console.info('[Outgoing]', reply); // eslint-disable-line
  });
});

watcher.on('change', (path) => {
  const relativePath = path.substring(__dirname.length + 1);
  const message = `FileWatcher: ./${relativePath} changed`;

  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
      console.info('[Outgoing]', message); // eslint-disable-line
    }
  });
});

watcher.start();

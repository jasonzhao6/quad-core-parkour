/* eslint no-console: ['error', { allow: ['info'] }] */
/* eslint no-restricted-globals: 'off' */
/* global WebSocket, location */

const client = new WebSocket('ws://localhost:3001');

client.onopen = () => {
  const message = 'FileWatcher: Ping';
  client.send(message);
  console.info('[Outgoing]', message);
};

client.onmessage = (e) => {
  const message = e.data;
  if (!(message).includes('Pong')) location.reload();
  console.info('[Incoming]', message);
};

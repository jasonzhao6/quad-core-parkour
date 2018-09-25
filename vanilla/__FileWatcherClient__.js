/* global WebSocket, location */
/* eslint no-restricted-globals: 0 */

const client = new WebSocket('ws://localhost:3001');

client.onopen = () => {
  const message = 'FileWatcher: Ping';
  client.send(message);
  console.info('[Outgoing]', message); // eslint-disable-line
};

client.onmessage = (e) => {
  const message = e.data;
  if (!(message).includes('Pong')) location.reload();
  console.info('[Incoming]', message); // eslint-disable-line
};

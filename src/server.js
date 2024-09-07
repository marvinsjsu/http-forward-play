const http = require('node:http');

const { handleForwardingRequest } = require('./service/proxy.service');

const PORT = 8989;

const server = http.createServer(handleForwardingRequest);

server.listen(PORT, () => {
    const address = server.address();
    console.log(`Starting proxy server on ${address.address}:${address.port}`);
});


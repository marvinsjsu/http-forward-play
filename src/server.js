const http = require('node:http');

const app = require('./app');
const {
    loadBannedWords,
    loadBannedDomains,
} = require('./service/access.service');

const PORT = 8989;

const server = http.createServer(app);

server.listen(PORT, async () => {
    
    await loadBannedWords();
    await loadBannedDomains();

    const address = server.address();
    console.log(`Starting proxy server on ${address.address}:${address.port}`);
});


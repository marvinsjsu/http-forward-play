const http = require('http');

const PORT = 8989;

const server = http.createServer((req, res) => {
    const { url, method } = req;
    console.log({ url, method });

});

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}...`);
});


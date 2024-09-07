const http = require('http');


function buildForwardRequestOptions (req) {
    const host = req.headers.host;
    const clientIPAddress = req.socket.remoteAddress;

    return {
        headers: { 'X-Forwarded-For': `${clientIPAddress}` },
        host,
    };
}

function handleForwardingRequest (req, res) {
    const forwardRequestOptions = buildForwardRequestOptions(req);
    const forwardReq = http.get(req.url, forwardRequestOptions);

    forwardReq.once('response', (externalRes) => {
        const ip = externalRes.socket.localAddress;
        const port = externalRes.socket.localPort;
        const targetPort = externalRes.socket.remotePort;
        
        console.log(`Request made.  Target: ${forwardRequestOptions.host}:${targetPort} Client: ${ip}:${port}`);
        
        let body = [];
        externalRes.on('data', (chunk) => {
            body.push(chunk);
        });
        externalRes.on('end', () => {
            body = Buffer.concat(body).toString();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(body);
        });
    });
}


module.exports = {
    handleForwardingRequest,
};

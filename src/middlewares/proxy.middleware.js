const http = require('http');

const { buildForwardRequestOptions } = require('../services/proxy.service');

async function forwardRequest (req, res) {
    return new Promise((resolve, reject) => {
        const forwardRequestOptions = buildForwardRequestOptions(req);
        const forwardRequest = http.get(req.url, forwardRequestOptions);
    
        forwardRequest.once('response', (externalRes) => {
            const ip = externalRes.socket.localAddress;
            const port = externalRes.socket.localPort;
            const targetPort = externalRes.socket.remotePort;
            
            console.log(`Request made.  Target: ${forwardRequestOptions.host}:${targetPort} Client: ${ip}:${port}`);
            
            let body = [];
            externalRes.on('data', chunk => body.push(chunk));
            externalRes.on('end', () => {
                body = Buffer.concat(body).toString();
                res.body = body;
                resolve();
            });
        });

        forwardRequest.on('error', (err) => {
            console.error(`Error with request to target server: ${err.message}`);
            reject(err);
        });
    });
}


module.exports = {
    forwardRequest
};

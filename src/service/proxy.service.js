const http = require('http');


function buildForwardRequestOptions (req) {
    const host = req.headers.host;
    const clientIPAddress = req.socket.remoteAddress;

    return {
        headers: { 'X-Forwarded-For': `${clientIPAddress}` },
        host,
    };
}

async function forwardRequest (req, res) {
    return new Promise((resolve, reject) => {
        const forwardRequestOptions = buildForwardRequestOptions(req);
        const forwardReq = http.get(req.url, forwardRequestOptions);
    
        forwardReq.once('response', (externalRes) => {
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

        forwardReq.on('error', reject);
    });
}


module.exports = {
    forwardRequest,
};


const hopByHopHeaders = [
    'connection',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailer',
    'transfer-encoding',
    'upgrade',
];

function removeHopByHopHeaders (headers) {
    const newHeaders = { ...headers };

    hopByHopHeaders.forEach(key => {
        delete newHeaders[key.toLowerCase()];
    });

    return newHeaders;
};

function buildForwardRequestOptions (req) {
    const targetHost = req.headers.host;
    const [hostname, port = 80] = targetHost.split(':');
    const clientIPAddress = req.socket.remoteAddress;

    const filteredHeaders = {
        ...removeHopByHopHeaders(req.headers),
        'X-Forwarded-For': `${clientIPAddress}`,
    };

    return {
        headers: filteredHeaders,
        method: req.method,
        host: targetHost,
        hostname,
        port,
    };
}

module.exports = {
    buildForwardRequestOptions,
};

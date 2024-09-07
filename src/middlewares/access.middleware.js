const {
    bannedWords,
    bannedDomains,
    forbiddenHeaderOptions,
} = require('../services/access.service');


function forbidBlockedDomains (req, res) {
    const host = req.headers.host;

    if (bannedDomains.includes(host)) {
        res.writeHead(403, forbiddenHeaderOptions);
        res.end(`Website not allowed: ${host}`);
    }
}

function forbidBannedWords (req, res) {
    const { body } = res;
    const hasBannedWord = bannedWords.some(word => body.includes(word));

    if (hasBannedWord) {
        res.writeHead(403, forbiddenHeaderOptions);
        res.end('Website content not allowed.');
    } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(body);
    }
}

module.exports = {
    forbidBlockedDomains,
    forbidBannedWords,
};

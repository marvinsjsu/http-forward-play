const { forbidBlockedDomains, forbidBannedWords } = require('./service/access.service');
const { forwardRequest } = require('./service/proxy.service');

const handlers = [
    forbidBlockedDomains,
    forwardRequest,
    forbidBannedWords,
];

async function app (req, res) {
    let i = 0;
    while (!res.finished && i < handlers.length) {
        await handlers[i](req, res);
        i++;
    }
}


module.exports = app;

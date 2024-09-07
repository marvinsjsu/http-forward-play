const { forbidBlockedDomains, forbidBannedWords } = require('./middlewares/access.middleware');
const { forwardRequest } = require('./middlewares/proxy.middleware');

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

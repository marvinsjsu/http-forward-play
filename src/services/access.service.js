const fs = require('node:fs/promises');
const path = require('node:path');


const bannedWords = [];
const bannedDomains = [];
const forbiddenHeaderOptions = {
    'X-Content-Type-Options': 'no-sniff',
    'Content-Type': 'text/plain',
};

async function loadBannedWords () {
    try {
        const pathToBannedWordsFile = path.join(__dirname, '..', '..', 'data', 'banned-words.txt');
        const bannedWordsData = await fs.readFile(pathToBannedWordsFile, { encoding: 'utf8'});

        if (bannedWordsData) {
            const bannedWordsArr = bannedWordsData.split('\n');
            bannedWordsArr.forEach(word => {
                if (Boolean(word)) {
                    bannedWords.push(word);
                }
            });
        }
    } catch (err) {
        console.error('Failed to load banned words.', err);
    }
}
async function loadBannedDomains () {
    try {
        const pathToBannedDomainsFile = path.join(__dirname, '..', '..', 'data', 'forbidden-hosts.txt');
        const domainData = await fs.readFile(pathToBannedDomainsFile, { encoding: 'utf8' });

        if (domainData) {
            const bannedDomainsArr = domainData.split('\n');
            bannedDomainsArr.forEach(domain => {
                if (Boolean(domain)) {
                    bannedDomains.push(domain);
                }
            });
        }
    } catch (err) {
        console.error('Failed to load banned domains.', err);
    }
}

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
    bannedWords,
    bannedDomains,
    forbiddenHeaderOptions,
    loadBannedWords,
    loadBannedDomains,
};

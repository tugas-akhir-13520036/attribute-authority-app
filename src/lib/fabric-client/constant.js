const { CLIENT_ID } = require('../../util/config');

const CHANNEL = {
    DEFAULT: 'mychannel',
};

const WALLET_PATH = '/tmp/wallet';

const orgConfig = {
    userId: CLIENT_ID,
    mspId: 'Org2MSP',
    peers: ['peer0.org2.example.com'],
    admin: 'admin',
    caHostName: 'ca.org2.example.com',
    affiliation: 'org2.department1',
    ccpPath: 'connection-org2.json',
};

// const orgConfig = {
//     merchant: {
//         name: ORGANIZATION.org1,
//         mspId: 'Org1MSP',
//         peers: ['peer0.org1.example.com'],
//         admin: 'admin',
//         caHostName: 'ca.org1.example.com',
//         affiliation: 'org1.department1',
//         ccpPath: 'connection-org1.json',
//     },
//     admin: {
//         name: ORGANIZATION.org2,
//         mspId: 'Org2MSP',
//         peers: ['peer0.org2.example.com'],
//         admin: 'admin',
//         caHostName: 'ca.org2.example.com',
//         affiliation: 'org2.department1',
//         ccpPath: 'connection-org2.json',
//     },
//     payment_provider: {
//         name: ORGANIZATION.org3,
//         mspId: 'Org3MSP',
//         peers: ['peer0.org3.example.com'],
//         admin: 'admin',
//         caHostName: 'ca.org3.example.com',
//         affiliation: 'org3.department1',
//         ccpPath: 'connection-org3.json',
//     },
// };

module.exports = {
    WALLET_PATH,
    CHANNEL,
    orgConfig,
};

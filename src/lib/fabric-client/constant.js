const ORGANIZATION = {
    org1: 'merchant',
    org2: 'admin',
    org3: 'payment_provider',

    MERCHANT: 'org1',
    ADMIN: 'org2',
    PAYMENT_PROVIDER: 'org3',

};

const CHANNEL = {
    DEFAULT: 'mychannel',
};

const WALLET_PATH = '/tmp/wallet';

const orgConfig = {
    org1: {
        name: ORGANIZATION.org1,
        mspId: 'Org1MSP',
        peers: ['peer0.org1.example.com'],
        admin: 'admin',
        caHostName: 'ca.org1.example.com',
        affiliation: 'org1.department1',
        ccpPath: 'connection-org1.json',
    },
    org2: {
        name: ORGANIZATION.org2,
        mspId: 'Org2MSP',
        peers: ['peer0.org2.example.com'],
        admin: 'admin',
        caHostName: 'ca.org2.example.com',
        affiliation: 'org2.department1',
        ccpPath: 'connection-org2.json',
    },
    org3: {
        name: ORGANIZATION.org3,
        mspId: 'Org3MSP',
        peers: ['peer0.org3.example.com'],
        admin: 'admin',
        caHostName: 'ca.org3.example.com',
        affiliation: 'org3.department1',
        ccpPath: 'connection-org3.json',
    },
};

module.exports = {
    ORGANIZATION,
    WALLET_PATH,
    CHANNEL,
    orgConfig,
};

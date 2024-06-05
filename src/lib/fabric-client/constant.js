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
    ccpPath: '../../../../fabric-network/test-network/organizations/peerOrganizations/org2.example.com/connection-org2.json',
};

const CHAINCODES = {
    MERCHANT_ATTR: 'merchant-attr-asset-transfer',
    ACCESS_DECISION: 'access-decision-asset-transfer',
    CHANNEL_POLICY: 'channel-policy-asset-transfer',
};

module.exports = {
    WALLET_PATH,
    CHANNEL,
    CHAINCODES,
    orgConfig,
};

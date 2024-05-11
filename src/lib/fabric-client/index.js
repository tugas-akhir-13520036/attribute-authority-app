const { Gateway, Wallets } = require('fabric-network');
const FabricCAClient = require('fabric-ca-client');
const path = require('path');
const fs = require('fs');

const CertAuthUtil = require('../../util/cert-authority');

const {
    WALLET_PATH, CHANNEL, orgConfig,
} = require('./constant');

class FabricClient {
    constructor(orgName) {
        this.channelName = CHANNEL.DEFAULT;
        this.org = orgConfig[orgName];
    }

    async init() {
        const ccpPath = path.resolve(__dirname, this.org.ccpPath);
        const walletPath = path.join(process.cwd(), WALLET_PATH);

        this.ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        this.caClient = CertAuthUtil.buildCAClient(FabricCAClient, this.ccp, this.org.caHostName);
        this.wallet = Wallets.newFileSystemWallet(walletPath);

        await CertAuthUtil.enrollAdmin(this.caClient, this.wallet, this.org.mspId);
    }

    async registerUser(userId) {
        await CertAuthUtil.registerAndEnrollUser(
            this.caClient,
            this.wallet,
            this.org.mspId,
            userId,
            this.org.affiliation,
        );
    }

    async connectNetwork(userId) {
        const gateway = new Gateway();
        await gateway.connect(this.ccp, {
            wallet: this.wallet,
            identity: userId,
            discovery: { enabled: true, asLocalhost: true },
        });
        const network = await gateway.getNetwork(this.channelName);
        return network;
    }
}

module.exports = FabricClient;

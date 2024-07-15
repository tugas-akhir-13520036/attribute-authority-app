const { Gateway, Wallets } = require('fabric-network');
const FabricCAClient = require('fabric-ca-client');
const path = require('path');
const fs = require('fs');

const CertAuthUtil = require('../util/cert-authority');

const {
    WALLET_PATH, CHANNEL, CHAINCODES, orgConfig,
} = require('./constant');
const logger = require('../../util/logger');

class FabricClient {
    constructor() {
        this.channelName = CHANNEL.DEFAULT;
        this.gateway = new Gateway();
    }

    async init() {
        const ccpPath = path.resolve(__dirname, orgConfig.ccpPath);
        const walletPath = path.join(process.cwd(), WALLET_PATH);

        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const caClient = CertAuthUtil.buildCAClient(FabricCAClient, ccp, orgConfig.caHostName);

        this.wallet = await Wallets.newFileSystemWallet(walletPath);

        logger.info('Enrolling Admin');
        await CertAuthUtil.enrollAdmin(caClient, this.wallet, orgConfig.mspId);

        logger.info('Registering and Enrolling User');
        await CertAuthUtil.registerAndEnrollUser(
            caClient,
            this.wallet,
            orgConfig.mspId,
            orgConfig.userId,
            orgConfig.affiliation,
        );

        logger.info('Connecting to Fabric gateway');
        await this.gateway.connect(ccp, {
            wallet: this.wallet,
            identity: orgConfig.userId,
            discovery: { enabled: true, asLocalhost: true },
        });
        this.network = await this.gateway.getNetwork(this.channelName);
        await this.mockGenerateAttributeAuthority();

        logger.info('Connected to Fabric gateway');
    }

    async mockGenerateAttributeAuthority() {
        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const eligibleAttributes = ['name', 'email', 'total_payment_volume', 'total_revenue', 'total_payment_count', 'is_corporate', 'is_website_valid'];
        await contract.submitTransaction('mockGenerateAttributeAuthority', eligibleAttributes);
    }

    async getAuthorityEligibleAttributes() {
        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const result = await contract.evaluateTransaction('getAuthorityEligibleAttributes');
        return JSON.parse(result.toString());
    }

    async getAttributes() {
        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const result = await contract.submitTransaction('getAttributesList');
        return JSON.parse(result.toString());
    }

    // Merchant
    async fetchMerchantList() {
        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const result = await contract.submitTransaction('fetchAllMerchantData');
        return JSON.parse(result.toString());
    }

    async fetchMerchant(id) {
        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const result = await contract.submitTransaction('fetchMerchantData', id);
        return JSON.parse(result.toString());
    }

    async activateMerchantAttribute(marchantId, attributeName) {
        const date = new Date().toISOString();

        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        await contract.submitTransaction('activateMerchantAttr', marchantId, attributeName, date);
    }

    async deactivateMerchantAttribute(marchantId, attributeName) {
        const date = new Date().toISOString();

        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        await contract.submitTransaction('deactivateMerchantAttr', marchantId, attributeName, date);
    }

    async fetchMerchantHistory(id) {
        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const result = await contract.evaluateTransaction('queryHistory', id);
        return JSON.parse(result.toString());
    }

    // Payment Channel
    async fetchPaymentChannelList() {
        const contract = this.network.getContract(CHAINCODES.CHANNEL_POLICY);
        const result = await contract.evaluateTransaction('fetchAllPaymentChannelData');
        return JSON.parse(result.toString());
    }

    async fetchPaymentChannel(id) {
        const contract = this.network.getContract(CHAINCODES.CHANNEL_POLICY);
        const result = await contract.evaluateTransaction('fetchChannelData', id);
        return JSON.parse(result.toString());
    }

    async fetchPaymentChannelHistory(id) {
        const contract = this.network.getContract(CHAINCODES.CHANNEL_POLICY);
        const result = await contract.evaluateTransaction('queryHistory', id);
        return JSON.parse(result.toString());
    }

    async fetchActivationRecord() {
        const contract = this.network.getContract(CHAINCODES.MERCHANT_ATTR);
        const result = await contract.evaluateTransaction('fetchActivationRecord');
        return JSON.parse(result.toString());
    }
}

module.exports = FabricClient;

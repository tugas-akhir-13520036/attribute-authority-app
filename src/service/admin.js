const logger = require('../util/logger');

class AdminService {
    constructor(fabricClient) {
        this.fabricClient = fabricClient;
    }

    async fetchAttributes() {
        logger.info('Fetching attributes');
        const res = await this.fabricClient.getAttributes();
        return res;
    }

    // Merchant
    async fetchMerchantList() {
        logger.info('Fetching merchant list');
        const res = await this.fabricClient.fetchMerchantList();
        return res;
    }

    async fetchMerchant(id) {
        logger.info(`Fetching merchant with id ${id}`);
        const res = await this.fabricClient.fetchMerchant(id);
        return res;
    }

    async activateMerchantAttribute(marchantId, attributeName) {
        logger.info(`Activating attribute ${attributeName} for merchant with id ${marchantId}`);
        await this.fabricClient.activateMerchantAttribute(marchantId, attributeName);
    }

    async deactivateMerchantAttribute(marchantId, attributeName) {
        logger.info(`Deactivating attribute ${attributeName} for merchant with id ${marchantId}`);
        await this.fabricClient.deactivateMerchantAttribute(marchantId, attributeName);
    }

    async fetchMerchantHistory(id) {
        logger.info(`Fetching merchant history with id ${id}`);
        const res = await this.fabricClient.fetchMerchantHistory(id);
        return res;
    }

    // Payment Channel
    async fetchPaymentChannelList() {
        logger.info('Fetching payment channel list');
        const res = await this.fabricClient.fetchPaymentChannelList();
        return res;
    }

    async fetchPaymentChannel(id) {
        logger.info(`Fetching payment channel with id ${id}`);
        const res = await this.fabricClient.fetchPaymentChannel(id);
        return res;
    }

    async fetchPaymentChannelHistory(id) {
        logger.info(`Fetching payment channel history with id ${id}`);
        const res = await this.fabricClient.fetchPaymentChannelHistory(id);
        return res;
    }
}

module.exports = AdminService;

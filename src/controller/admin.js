const { Router } = require('express');
const handleAsync = require('../util/handle-async');

class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
        this.router = Router();
        this.initRouter();
    }

    initRouter() {
        this.router.get('/attributes', handleAsync(this.getAttributeList.bind(this)));

        this.router.get('/activation-record', handleAsync(this.fetchActivationRecord.bind(this)));

        // Merchant
        this.router.get('/merchant', handleAsync(this.fetchMerchantList.bind(this)));
        this.router.get('/merchant/:id', handleAsync(this.fetchMerchant.bind(this)));
        this.router.post('/merchant/activate-attribute', handleAsync(this.activateMerchantAttribute.bind(this)));
        this.router.post('/merchant/deactivate-attribute', handleAsync(this.deactivateMerchantAttribute.bind(this)));
        this.router.get('/merchant/:id/history', handleAsync(this.fetchMerchantHistory.bind(this)));

        // Payment Channel
        this.router.get('/payment-channel', handleAsync(this.fetchPaymentChannelList.bind(this)));
        this.router.get('/payment-channel/:id', handleAsync(this.fetchPaymentChannel.bind(this)));
        this.router.get('/payment-channel/:id/history', handleAsync(this.fetchPaymentChannelHistory.bind(this)));

        // Authority
        this.router.get('/eligible-attributes', handleAsync(this.getAuthorityEligibleAttributes.bind(this)));
    }

    getRouter() {
        return this.router;
    }

    async getAttributeList(req, res) {
        const attributeList = await this.adminService.fetchAttributes();
        return res.status(200).json(attributeList);
    }

    // Merchant
    async fetchMerchantList(req, res) {
        const merchantList = await this.adminService.fetchMerchantList();
        return res.status(200).json(merchantList);
    }

    async fetchMerchant(req, res) {
        const { id } = req.params;
        const merchant = await this.adminService.fetchMerchant(id);
        return res.status(200).json(merchant);
    }

    async activateMerchantAttribute(req, res) {
        const { merchantId, attributeName } = req.body;
        await this.adminService.activateMerchantAttribute(merchantId, attributeName);
        return res.status(200).json({ message: 'Attribute activated successfully' });
    }

    async deactivateMerchantAttribute(req, res) {
        const { merchantId, attributeName } = req.body;
        await this.adminService.deactivateMerchantAttribute(merchantId, attributeName);
        return res.status(200).json({ message: 'Attribute deactivated successfully' });
    }

    async fetchMerchantHistory(req, res) {
        const { id } = req.params;
        const merchantHistory = await this.adminService.fetchMerchantHistory(id);
        return res.status(200).json(merchantHistory);
    }

    // Payment Channel
    async fetchPaymentChannelList(req, res) {
        const paymentChannelList = await this.adminService.fetchPaymentChannelList();
        return res.status(200).json(paymentChannelList);
    }

    async fetchPaymentChannel(req, res) {
        const { id } = req.params;
        const paymentChannel = await this.adminService.fetchPaymentChannel(id);
        return res.status(200).json(paymentChannel);
    }

    async fetchPaymentChannelHistory(req, res) {
        const { id } = req.params;
        const paymentChannelHistory = await this.adminService.fetchPaymentChannelHistory(id);
        return res.status(200).json(paymentChannelHistory);
    }

    async fetchActivationRecord(req, res) {
        const activationRecord = await this.adminService.fetchActivationRecord();
        return res.status(200).json(activationRecord);
    }

    async getAuthorityEligibleAttributes(req, res) {
        const attributes = await this.adminService.getAuthorityEligibleAttributes();
        return res.status(200).json(attributes);
    }
}

module.exports = AdminController;

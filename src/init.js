const MerchantFabricClient = require('./lib/merchant-fabric-client');
const AdminFabricClient = require('./lib/admin-fabric-client');
const PaymentProviderFabricClient = require('./lib/payment-provider-fabric-client');

class Init {
    constructor(app) {
        this.app = app;

        this.MerchantFabricClient = new MerchantFabricClient();
        this.AdminFabricClient = new AdminFabricClient();
        this.PaymentProviderFabricClient = new PaymentProviderFabricClient();
    }

    async setupService() {
        await this.MerchantFabricClient.init();
        await this.AdminFabricClient.init();
        await this.PaymentProviderFabricClient.init();
    }

    async setupRoutes() {
        await this.setupService();
        this.app.get(
            '/healthcheck',
            (_, res) => {
                res.status(200).send('Access Control Service is healthy! ');
            },
        );
    }
}

module.exports = Init;

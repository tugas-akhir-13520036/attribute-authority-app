const FabricClient = require('../fabric-client');
const { ORGANIZATION } = require('../fabric-client/constant');

class PaymentProviderFabricClient extends FabricClient {
    constructor() {
        super(ORGANIZATION.MERCHANT);
    }
}

module.exports = PaymentProviderFabricClient;

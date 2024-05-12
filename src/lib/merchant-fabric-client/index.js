const FabricClient = require('../fabric-client');
const { ORGANIZATION } = require('../fabric-client/constant');

class MerchantFabricClient extends FabricClient {
    constructor() {
        super(ORGANIZATION.MERCHANT);
    }
}

module.exports = MerchantFabricClient;

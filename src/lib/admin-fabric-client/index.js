const FabricClient = require('../fabric-client');
const { ORGANIZATION } = require('../fabric-client/constant');

class AdminFabricClient extends FabricClient {
    constructor() {
        super(ORGANIZATION.ADMIN);
    }
}

module.exports = AdminFabricClient;

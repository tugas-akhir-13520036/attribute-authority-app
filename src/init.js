const FabricClient = require('./lib/fabric-client');

class Init {
    constructor(app) {
        this.app = app;

        this.FabricClient = new FabricClient();
    }

    async setupService() {
        await this.FabricClient.init();
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

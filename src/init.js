class Init {
    constructor(app) {
        this.app = app;
    }

    async setupRoutes() {
        this.app.get(
            '/healthcheck',
            (_, res) => {
                res.status(200).send('Access Control Service is healthy! ');
            },
        );
    }
}

module.exports = Init;

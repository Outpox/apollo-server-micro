"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var microApollo_1 = require("./microApollo");
require("mocha");
var micro_1 = require("micro");
var microrouter_1 = require("microrouter");
var apollo_server_integration_testsuite_1 = require("apollo-server-integration-testsuite");
function createApp(options) {
    var graphqlOptions = (options && options.graphqlOptions) || { schema: apollo_server_integration_testsuite_1.schema };
    var graphiqlOptions = (options && options.graphiqlOptions) || {
        endpointURL: '/graphql',
    };
    var graphqlHandler = microApollo_1.microGraphql(graphqlOptions);
    var graphiqlHandler = microApollo_1.microGraphiql(graphiqlOptions);
    return micro_1.default(microrouter_1.router(microrouter_1.get('/graphql', graphqlHandler), microrouter_1.post('/graphql', graphqlHandler), microrouter_1.put('/graphql', graphqlHandler), microrouter_1.patch('/graphql', graphqlHandler), microrouter_1.del('/graphql', graphqlHandler), microrouter_1.head('/graphql', graphqlHandler), microrouter_1.options('/graphql', graphqlHandler), microrouter_1.get('/graphiql', graphiqlHandler), microrouter_1.post('/graphiql', graphiqlHandler), microrouter_1.put('/graphiql', graphiqlHandler), microrouter_1.patch('/graphiql', graphiqlHandler), microrouter_1.del('/graphiql', graphiqlHandler), microrouter_1.head('/graphiql', graphiqlHandler), microrouter_1.options('/graphiql', graphiqlHandler), function (req, res) { return micro_1.send(res, 404, 'not found'); }));
}
describe('integration:Micro', function () {
    apollo_server_integration_testsuite_1.default(createApp);
});
//# sourceMappingURL=microApollo.test.js.map
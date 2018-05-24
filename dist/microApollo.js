"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_core_1 = require("apollo-server-core");
var GraphiQL = require("apollo-server-module-graphiql");
var micro_1 = require("micro");
var url = require("url");
var apollo_upload_server_1 = require("apollo-upload-server");
function microGraphql(options, uploadOptions) {
    var _this = this;
    if (uploadOptions === void 0) { uploadOptions = null; }
    if (!options) {
        throw new Error('Apollo Server requires options.');
    }
    if (arguments.length > 2) {
        throw new Error("Apollo Server expects one or argument(s), got " + arguments.length);
    }
    var graphqlHandler = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var query, contentType, err_1, gqlResponse, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(req.method === 'POST')) return [3, 8];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    contentType = req.headers["content-type"];
                    if (!(!contentType || contentType.indexOf('multipart/form-data') === -1)) return [3, 3];
                    return [4, micro_1.json(req)];
                case 2:
                    query = _a.sent();
                    return [3, 5];
                case 3: return [4, apollo_upload_server_1.processRequest(req, uploadOptions)];
                case 4:
                    query = _a.sent();
                    _a.label = 5;
                case 5: return [3, 7];
                case 6:
                    err_1 = _a.sent();
                    query = undefined;
                    return [3, 7];
                case 7: return [3, 9];
                case 8:
                    query = url.parse(req.url, true).query;
                    _a.label = 9;
                case 9:
                    _a.trys.push([9, 11, , 12]);
                    return [4, apollo_server_core_1.runHttpQuery([req, res], {
                            method: req.method,
                            options: options,
                            query: query,
                        })];
                case 10:
                    gqlResponse = _a.sent();
                    res.setHeader('Content-Type', 'application/json');
                    return [2, gqlResponse];
                case 11:
                    error_1 = _a.sent();
                    if ('HttpQueryError' === error_1.name) {
                        if (error_1.headers) {
                            Object.keys(error_1.headers).forEach(function (header) {
                                res.setHeader(header, error_1.headers[header]);
                            });
                        }
                    }
                    if (!error_1.statusCode) {
                        error_1.statusCode = 500;
                    }
                    throw error_1;
                case 12: return [2];
            }
        });
    }); };
    return graphqlHandler;
}
exports.microGraphql = microGraphql;
function microGraphiql(options) {
    var graphiqlHandler = function (req, res) {
        var query = (req.url && url.parse(req.url, true).query) || {};
        return GraphiQL.resolveGraphiQLString(query, options, req).then(function (graphiqlString) {
            res.setHeader('Content-Type', 'text/html');
            res.write(graphiqlString);
            res.end();
        }, function (error) {
            res.statusCode = 500;
            res.write(error.message);
            res.end();
        });
    };
    return graphiqlHandler;
}
exports.microGraphiql = microGraphiql;
//# sourceMappingURL=microApollo.js.map
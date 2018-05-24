/// <reference types="@types/node" />
import { GraphQLOptions } from 'apollo-server-core';
import * as GraphiQL from 'apollo-server-module-graphiql';
import { RequestHandler } from 'micro';
import { IncomingMessage } from 'http';
export interface MicroGraphQLOptionsFunction {
    (req?: IncomingMessage): GraphQLOptions | Promise<GraphQLOptions>;
}
export interface MicroGraphQLUploadOptions {
    uploadDir: string;
}
export declare function microGraphql(options: GraphQLOptions | MicroGraphQLOptionsFunction, uploadOptions?: MicroGraphQLUploadOptions): RequestHandler;
export interface MicroGraphiQLOptionsFunction {
    (req?: IncomingMessage): GraphiQL.GraphiQLData | Promise<GraphiQL.GraphiQLData>;
}
export declare function microGraphiql(options: GraphiQL.GraphiQLData | MicroGraphiQLOptionsFunction): RequestHandler;

/// <reference types="@cloudflare/workers-types" />
import { Middleware } from '../../types/middleware';
import { FirewallField, FirewallHandler } from '../../types/middlewares/firewall';
export declare const getFieldParam: (request: Request, field: FirewallField) => string | number | void;
export declare const matchOperator: FirewallHandler;
export declare const notMatchOperator: FirewallHandler;
export declare const equalOperator: FirewallHandler;
export declare const notEqualOperator: FirewallHandler;
export declare const greaterOperator: FirewallHandler;
export declare const lessOperator: FirewallHandler;
export declare const containOperator: FirewallHandler;
export declare const notContainOperator: FirewallHandler;
export declare const inOperator: FirewallHandler;
export declare const notInOperator: FirewallHandler;
/**
 * The `useFirewall` middleware inspects the request and blocks the request if
 * it matches one of the firewall rules.
 * @param context - The context of the middleware pipeline
 * @param next - The function to invoke the next middleware in the pipeline
 */
export declare const useFirewall: Middleware;

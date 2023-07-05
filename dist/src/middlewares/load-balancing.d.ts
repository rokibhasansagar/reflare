import { Middleware } from '../../types/middleware';
import { LoadBalancingHandler } from '../../types/middlewares/load-balancing';
export declare const ipHashHandler: LoadBalancingHandler;
export declare const randomHandler: LoadBalancingHandler;
/**
 * The `useLoadBalancing` middleware picks an upstream server based on the load
 * balancing policy.
 * @param context - The context of the middleware pipeline
 * @param next - The function to invoke the next middleware in the pipeline
 */
export declare const useLoadBalancing: Middleware;

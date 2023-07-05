import { Middleware } from '../../types/middleware';
import { UpstreamOptions } from '../../types/middlewares/upstream';
export declare const rewriteURL: (url: string, upstream: UpstreamOptions) => string;
/**
 * The `useUpstream` middleware sents the request to the upstream and captures
 * the response.
 * @param context - The context of the middleware pipeline
 * @param next - The function to invoke the next middleware in the pipeline
 */
export declare const useUpstream: Middleware;

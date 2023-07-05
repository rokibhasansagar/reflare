import { Middleware } from '../../types/middleware';
/**
 * The `useCORS` middleware modifies the HTTP headers related to CORS
 * (Cross-Origin Resource Sharing) on the response.
 * @param context - The context of the middleware pipeline
 * @param next - The function to invoke the next middleware in the pipeline
 */
export declare const useCORS: Middleware;

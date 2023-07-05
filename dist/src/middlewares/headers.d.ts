/// <reference types="@cloudflare/workers-types" />
import { Middleware } from '../../types/middleware';
export declare const setForwardedHeaders: (headers: Headers) => void;
/**
 * The `useHeaders` middleware modifies the headers of the request and response.
 * - The middleware adds `X-Forwarded-Proto`, `X-Forwarded-For`, and
 * `X-Forwarded-Host` headers to indicate that the client is connecting to the
 * upstream through a reverse proxy.
 * - The middleware adds customized headers to the request and response.
 * @param context - The context of the middleware pipeline
 * @param next - The function to invoke the next middleware in the pipeline
 */
export declare const useHeaders: Middleware;

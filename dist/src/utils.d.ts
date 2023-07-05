/// <reference types="@cloudflare/workers-types" />
import { UpstreamOptions } from '../types/middlewares';
export declare const getHostname: (request: Request) => string;
export declare const isSameOrigin: (url: URL, upstream: UpstreamOptions) => boolean;
export declare const castToIterable: <T>(value: T | T[]) => T[];

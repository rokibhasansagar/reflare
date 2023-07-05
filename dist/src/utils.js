export const getHostname = (request) => {
    const url = new URL(request.url);
    return url.host;
};
export const isSameOrigin = (url, upstream) => {
    if (url.hostname !== upstream.domain) {
        return false;
    }
    if (url.port !== '') {
        return false;
    }
    if (upstream.protocol === undefined
        && url.protocol !== 'https:') {
        return false;
    }
    if (upstream.protocol !== undefined
        && `${upstream.protocol}:` !== url.protocol) {
        return false;
    }
    return true;
};
export const castToIterable = (value) => (Array.isArray(value) ? value : [value]);
//# sourceMappingURL=utils.js.map
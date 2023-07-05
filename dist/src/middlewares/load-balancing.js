import { castToIterable } from '../utils';
const validateUpstream = (upstream) => {
    if (upstream.domain === undefined) {
        throw new Error('Invalid \'upstream\' field in the option object');
    }
};
export const ipHashHandler = (upstream, request) => {
    const ipString = request.headers.get('cf-connecting-ip') || '0.0.0.0';
    const userIP = ipString.split('.').map((octet, index, array) => parseInt(octet, 10) * (256 ** (array.length - index - 1))).reduce((accumulator, current) => accumulator + current);
    return upstream[userIP % upstream.length];
};
export const randomHandler = (upstream) => {
    const weights = upstream.map((option) => (option.weight === undefined ? 1 : option.weight));
    const totalWeight = weights.reduce((acc, num, index) => {
        const sum = acc + num;
        weights[index] = sum;
        return sum;
    });
    if (totalWeight === 0) {
        throw new Error('Total weights should be greater than 0.');
    }
    const random = Math.random() * totalWeight;
    for (const index of weights.keys()) {
        if (weights[index] >= random) {
            return upstream[index];
        }
    }
    return upstream[Math.floor(Math.random() * upstream.length)];
};
const handlersMap = {
    random: randomHandler,
    'ip-hash': ipHashHandler,
};
/**
 * The `useLoadBalancing` middleware picks an upstream server based on the load
 * balancing policy.
 * @param context - The context of the middleware pipeline
 * @param next - The function to invoke the next middleware in the pipeline
 */
export const useLoadBalancing = async (context, next) => {
    const { request, route } = context;
    const { upstream, loadBalancing } = route;
    if (upstream === undefined) {
        throw new Error('The required \'upstream\' field in the option object is missing');
    }
    const upstreamIterable = castToIterable(upstream);
    upstreamIterable.forEach(validateUpstream);
    if (loadBalancing === undefined) {
        context.upstream = randomHandler(upstreamIterable, request);
        await next();
        return;
    }
    const policy = loadBalancing.policy || 'random';
    const policyHandler = handlersMap[policy];
    context.upstream = policyHandler(upstreamIterable, request);
    await next();
};
//# sourceMappingURL=load-balancing.js.map
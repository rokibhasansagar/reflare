const fields = new Set([
    'country',
    'continent',
    'asn',
    'ip',
    'hostname',
    'user-agent',
]);
const operators = new Set([
    'equal',
    'not equal',
    'greater',
    'less',
    'in',
    'not in',
    'contain',
    'not contain',
    'match',
    'not match',
]);
const validateFirewall = ({ field, operator, value, }) => {
    if (field === undefined
        || operator === undefined
        || value === undefined) {
        throw new Error('Invalid \'firewall\' field in the option object');
    }
    if (fields.has(field) === false) {
        throw new Error('Invalid \'firewall\' field in the option object');
    }
    if (operators.has(operator) === false) {
        throw new Error('Invalid \'firewall\' field in the option object');
    }
};
export const getFieldParam = (request, field) => {
    const cfProperties = request.cf;
    switch (field) {
        case 'asn':
            return cfProperties?.asn;
        case 'continent':
            return cfProperties?.continent;
        case 'country':
            return cfProperties?.country;
        case 'hostname':
            return request.headers.get('host') || '';
        case 'ip':
            return request.headers.get('cf-connecting-ip') || '';
        case 'user-agent':
            return request.headers.get('user-agent') || '';
        default:
            return undefined;
    }
};
export const matchOperator = (fieldParam, value) => {
    if (!(value instanceof RegExp)) {
        throw new Error('You must use \'new RegExp(\'...\')\' for \'value\' in firewall configuration to use \'match\' or \'not match\' operator');
    }
    return value.test(fieldParam.toString());
};
export const notMatchOperator = (fieldParam, value) => !matchOperator(fieldParam, value);
export const equalOperator = (fieldParam, value) => fieldParam === value;
export const notEqualOperator = (fieldParam, value) => fieldParam !== value;
export const greaterOperator = (fieldParam, value) => {
    if (typeof fieldParam !== 'number'
        || typeof value !== 'number') {
        throw new Error('You must use number for \'value\' in firewall configuration to use \'greater\' or \'less\' operator');
    }
    return fieldParam > value;
};
export const lessOperator = (fieldParam, value) => {
    if (typeof fieldParam !== 'number'
        || typeof value !== 'number') {
        throw new Error('You must use number for \'value\' in firewall configuration to use \'greater\' or \'less\' operator');
    }
    return fieldParam < value;
};
export const containOperator = (fieldParam, value) => {
    if (typeof fieldParam !== 'string'
        || typeof value !== 'string') {
        throw new Error('You must use string for \'value\' in firewall configuration to use \'contain\' or \'not contain\' operator');
    }
    return fieldParam.includes(value);
};
export const notContainOperator = (fieldParam, value) => !containOperator(fieldParam, value);
export const inOperator = (fieldParam, value) => {
    if (!Array.isArray(value)) {
        throw new Error('You must use an Array for \'value\' in firewall configuration to use \'in\' or \'not in\' operator');
    }
    return value.some((item) => item === fieldParam);
};
export const notInOperator = (fieldParam, value) => !inOperator(fieldParam, value);
const operatorsMap = {
    match: matchOperator,
    contain: containOperator,
    equal: equalOperator,
    in: inOperator,
    greater: greaterOperator,
    less: lessOperator,
    'not match': notMatchOperator,
    'not contain': notContainOperator,
    'not equal': notEqualOperator,
    'not in': notInOperator,
};
/**
 * The `useFirewall` middleware inspects the request and blocks the request if
 * it matches one of the firewall rules.
 * @param context - The context of the middleware pipeline
 * @param next - The function to invoke the next middleware in the pipeline
 */
export const useFirewall = async (context, next) => {
    const { request, route } = context;
    if (route.firewall === undefined) {
        await next();
        return;
    }
    route.firewall.forEach(validateFirewall);
    for (const { field, operator, value } of route.firewall) {
        const fieldParam = getFieldParam(request, field);
        if (fieldParam !== undefined
            && operatorsMap[operator](fieldParam, value)) {
            throw new Error('You don\'t have permission to access this service.');
        }
    }
    await next();
};
//# sourceMappingURL=firewall.js.map
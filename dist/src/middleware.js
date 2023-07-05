export const usePipeline = (...initMiddlewares) => {
    const stack = [...initMiddlewares];
    const push = (...middlewares) => {
        stack.push(...middlewares);
    };
    const execute = async (context) => {
        const runner = async (prevIndex, index) => {
            if (index === prevIndex) {
                throw new Error('next() called multiple times');
            }
            if (index >= stack.length) {
                return;
            }
            const middleware = stack[index];
            const next = async () => runner(index, index + 1);
            await middleware(context, next);
        };
        await runner(-1, 0);
    };
    return {
        push,
        execute,
    };
};
//# sourceMappingURL=middleware.js.map
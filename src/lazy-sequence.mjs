const reduceExecute = functions => args => {
    return functions.reduce((res, fn) => {
        args ? fn(...args) : fn();
    }, () => {});
};

const sequence = function(fn) {
    if (!fn) return;

    const instance = function _executor() {
        if (arguments.length) {
            const notFunctions = [...arguments].filter(arg => {
                return typeof arg !== "function";
            });

            if (notFunctions.length) {
                return instance.reduce([...arguments]);
            }

            instance.functions.push(...arguments);

            return instance;
        }

        return instance.reduce();
    };

    instance.functions = [];
    instance.reduce = reduceExecute(instance.functions);

    return instance(...arguments);
};

export default sequence;
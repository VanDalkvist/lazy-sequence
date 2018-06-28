import tape from "tape";

import sequence from "./lazy-sequence";

tape.test("sequence with no function", function(t) {
    t.plan(1);

    t.doesNotThrow(() => sequence());
});

tape.test("sequence with one function", function(t) {
    t.plan(2);

    let check = false;
    const fn = sequence(() => (check = true));

    t.equal(typeof fn, 'function');
    fn();
    t.equal(check, true);
});

tape.test("sequence with two functions", function(t) {
    t.plan(2);

    let check = 0;

    const func1 = () => (check = 1);
    const func2 = () => (check = 5);

    const fn = sequence(func1)(func2);

    t.equal(typeof fn, 'function');
    fn();
    t.equal(check, 5);
});

tape.test("sequence with three functions", function(t) {
    t.plan(2);

    let check = 0;

    const func1 = () => (check = 1);
    const func2 = () => (check = 5);
    const func3 = () => (check = 9);

    const fn = sequence(func1)(func2)(func3);

    t.equal(typeof fn, 'function');
    fn();
    t.equal(check, 9);
});

tape.test("sequence with three functions. adding one, then two together", function(t) {
    t.plan(2);

    let check = 0;

    const func1 = () => (check = 1);
    const func2 = () => (check = 5);
    const func3 = () => (check = 9);

    const fn = sequence(func1)(func2, func3);

    t.equal(typeof fn, 'function');
    fn();
    t.equal(check, 9);
});

tape.test("sequence with three functions. adding three together", function(t) {
    t.plan(2);

    let check = 0;

    const func1 = () => (check = 1);
    const func2 = () => (check = 5);
    const func3 = () => (check = 9);

    const fn = sequence(func1, func2, func3);

    t.equal(typeof fn, 'function');
    fn();
    t.equal(check, 9);
});

tape.test("sequence with three functions. adding three together. with an object argument at the call time", function(t) {
    t.plan(2);

    let check = 0;

    const func1 = () => (check = 1);
    const func2 = () => (check = 5);
    const func3 = () => (check = 9);

    const fn = sequence(func1, func2, func3);

    t.equal(typeof fn, 'function');
    fn({});
    t.equal(check, 9);
});

tape.test("sequence with three functions. adding three together. with an object and a function arguments at the call time", function(t) {
    t.plan(2);

    let check = 0;

    const func1 = () => (check = 1);
    const func2 = () => (check = 5);
    const func3 = () => (check = 9);
    const func4 = () => (check = "!!!");

    const fn = sequence(func1, func2, func3);

    t.equal(typeof fn, 'function');
    fn({}, func4);
    t.equal(check, 9);
});

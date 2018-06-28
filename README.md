# lazy-sequence
JS function which executes functions passed by arguments in sequence somewhen you want it.

### Examples 

```js
const fn = sequence(func1)(func2)(func3);
fn();
```
 // will call all three functions in sequence
_____
```js
const fn = sequence(func1, func2, func3);
fn();
```
 // the same as first
_____
```js
const fn = sequence(func1)(func2);
fn();
```
 // will call two functions in sequence
_____
```js
const fn = sequence(func1)(func2)(func3);
fn({ title: "Hello world!" });
```
 // will call all three functions in sequence with arguments. All functions will recieve the same argument - `{ title: "Hello world!" }` in this case.
_____
```js
const fn = sequence(func1)(func2)(func3);
fn({ title: "Hello world!" }, func4);
```
 // you can pass functions at the end only with non-functions arguments to understand it as a final execution.
_____

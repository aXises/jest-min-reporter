interface Array<T> {
    ifAny: (fn: (v: Array<T>) => void) => Array<T>;
}

Array.prototype.ifAny = function (fn) {
    if (this.length > 0) {
        fn(this);
    }
    return this;
};

interface Array<T> {
    ifAny: (fn: (v:T[]) => void) => T[];
}

Array.prototype.ifAny = function (fn) {
    if (this.length > 0) {
        fn(this);
    }
    return this;
};

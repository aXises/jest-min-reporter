export const not = (fn: (...p: any[]) => boolean) => {
    return (...params: any[]) => {
        return !fn(...params);
    };
};

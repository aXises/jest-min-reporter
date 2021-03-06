const colorize = (color: string) => {
    const reset = "\x1b[0m";
    return (s: string | number) => {
        const str = s.toString();
        return global.reporterGlobals.coloursEnabled
            ? color + str + reset
            : str;
    };
};

export const bgLightRed = colorize("\x1b[101m");
export const bgLightGreen = colorize("\x1b[102m");
export const black = colorize("\x1b[30m");
export const white = colorize("\x1b[1m");
export const red = colorize("\x1b[31m");
export const green = colorize("\x1b[32m");
export const lightRed = colorize("\x1b[91m");
export const lightYellow = colorize("\x1b[93m");
export const yellow = colorize("\x1b[33m");

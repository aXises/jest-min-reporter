import { intDiv } from "./math";

const sd = 1000;
const md = sd * 60;
const hd = md * 60;

const cond = (v: number, l: string) => {
    return v ? v + l : "";
};

const timeObject = (h: number, m: number, s: number, ms: number = 0) => {
    return {
        h,
        m,
        s,
        ms,
        get timestamp(): number {
            return h * hd + m * md + s * sd + ms;
        },
        toString(): string {
            const h = cond(this.h, "h");
            const m = cond(this.m, "m");
            const s = cond(this.s, "s");
            const ms = cond(this.ms, "ms");

            return [ms, s, m, h]
                .filter((interval) => interval)
                .reduce(
                    (prev, curr) => (prev === "" ? curr : curr + " " + prev),
                    ""
                );
        },
    };
};

export const timestampToTimeObject = (timestamp: any) => {
    const h = intDiv(timestamp, hd);
    timestamp -= h * hd;
    const m = intDiv(timestamp, md);
    timestamp -= m * md;
    const s = intDiv(timestamp, sd);
    timestamp -= s * sd;

    return timeObject(h, m, s, timestamp);
};

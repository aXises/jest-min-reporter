import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    reporters: [["./dist", { colours: true, diffs: true }]],
};

export default config;

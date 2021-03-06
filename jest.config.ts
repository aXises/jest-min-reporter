import type { Config } from "@jest/types";
import path from "path";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    reporters: [[path.join(__dirname, "dist"), { colours: true, diffs: false }]],
    testMatch: [path.join(__dirname, "test", "**", "*")],
};

export default config;

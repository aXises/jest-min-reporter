import { getVersion } from "@jest/core";
import type {
    AggregatedResult,
    SnapshotSummary,
    TestResult,
    AssertionResult,
} from "@jest/test-result";
import {
    bgLightGreen,
    bgLightRed,
    black,
    green,
    lightRed,
    lightYellow,
    not,
    processFullPath,
    red,
    timestampToTimeObject as timeObj,
    white,
    yellow,
} from "./";
import { assertNever } from "assert-never";

const isFailing = (result: TestResult): boolean => {
    return Boolean(result.numFailingTests > 0 || result.failureMessage);
};

export const printf = (...s: any[]): void => {
    console.log(...s);
};

export const println = (times: number = 1) => {
    for (let i = 0; i < times; i++) {
        printf("");
    }
};

export const printHeaderOnStart = () => {
    println(2);
    const reporterVersionString = process.env.npm_package_version
        ? `jest-min-reporter v${process.env.npm_package_version}`
        : "";
    printf(
        white(
            `Jest v${getVersion()} node ${process.version} ${
                process.platform
            } ${reporterVersionString}`
        )
    );
};

export const printHeaderOnComplete = () => {
    printf(lightYellow("Summary reporter output:"));
    println(2);
};

export const printFailedTestDiffs = (results: AggregatedResult) => {
    results.testResults
        .filter((suite) => suite.failureMessage)
        .ifAny((suites: TestResult[]) => {
            suites.forEach((suite) => {
                printf("Failed test diffs:");

                const fullPath = processFullPath(suite.testFilePath);
                const path = fullPath.path || "";
                const file = fullPath.file || "";
                const message = suite.failureMessage;
                printf(
                    `${black(bgLightRed(" FAIL "))} ${path}${white(
                        file
                    )}\n${message}`
                );

                println();
            });
        });
};

export const printSummary = (results: AggregatedResult) => {
    const {
        numTotalTestSuites: totalSuites,
        numPassedTestSuites: passedSuites,
        numPendingTestSuites: pendingSuites,
        numTotalTests: totalTests,
        numPassedTests: passedTests,
        numFailedTests: failedTests,
        numRuntimeErrorTestSuites: erroredTests,
        snapshot,
    } = results;
    const failedSuites = totalSuites - passedSuites - pendingSuites;
    const failed = failedTests > 0 || erroredTests > 0 || snapshot.failure;

    printf("Summary:");
    printf(
        `Suites: ${
            failed ? lightRed(failedSuites) : green(passedSuites)
        }/${white(totalSuites)}`
    );
    printf(
        `Tests:  ${failed ? lightRed(failedTests) : green(passedTests)}/${white(
            totalTests
        )}`
    );
    printf(`Time:   ${timeObj(Date.now() - results.startTime)}`);
};

const makeTestFullName = (test: AssertionResult) => {
    const pathArray = test.ancestorTitles;
    pathArray.push(test.title);
    return pathArray.join(" -> ");
};

const printTestStatus = (suite: TestResult, showPassing: boolean = false) => {
    suite.testResults.forEach((test) => {
        switch (test.status) {
            case "passed":
                showPassing &&
                    printf(`${green("  ✓  ")}${makeTestFullName(test)}`);
                return;
            case "failed":
                printf(`${red("  ☓  ")}${yellow(makeTestFullName(test))}`);
                return;
            case "skipped":
                printf(`${white("  ○  ")}${makeTestFullName(test)} (Skipped)`);
                return;
            case "pending":
                printf(`${white("  ○  ")}${makeTestFullName(test)} (Pending)`);
                return;
            case "todo":
                printf(`${white("  ○  ")}${makeTestFullName(test)} (Todo)`);
                return;
            case "disabled":
                printf(`${white("  ○  ")}${makeTestFullName(test)} (Disabled)`);
                return;
            default:
                assertNever(test.status);
        }
    });
};

const fullPathToPrintable = (fullPath: { path?: string; file?: string }) => {
    return {
        path: fullPath.path || "",
        file: fullPath.file || "",
    };
};

export const printPassedSuites = (
    suites: AggregatedResult,
    showPassing: boolean = false
) => {
    suites.testResults.filter(not(isFailing)).ifAny((suites) => {
        printf("Passed suites:");
        suites.forEach((suite: TestResult) => {
            const { path, file } = fullPathToPrintable(
                processFullPath(suite.testFilePath)
            );
            printf(`${bgLightGreen(black("  PASS  "))} ${path}${file}`);
            printTestStatus(suite, showPassing);
        });
        println(2);
    });
};

export const printFailedSuites = (
    suites: AggregatedResult,
    showPassing: boolean = false
) => {
    suites.testResults.filter(isFailing).ifAny((suites: TestResult[]) => {
        printf("Failed suites:");
        suites.forEach((suite: TestResult) => {
            const { path, file } = fullPathToPrintable(
                processFullPath(suite.testFilePath)
            );
            printf(`${bgLightRed(black("  FAIL  "))} ${path}${white(file)}`);
            printTestStatus(suite, showPassing);
        });
        println(2);
    });
};

export const printUncheckedSnapshotsSummary = (snapshot: SnapshotSummary) => {
    snapshot.uncheckedKeysByFile.forEach((snapshotFiles) => {
        const { path, file } = fullPathToPrintable(
            processFullPath(snapshotFiles.filePath)
        );
        printf(`${path}${white(file)}`);
    });
    println(2);
};

import { getVersion } from "@jest/core";
import type {
    AggregatedResult,
    SnapshotSummary,
    TestResult,
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

const suiteFailed = (result: TestResult): boolean => {
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
    printf(
        white(
            `Jest v${getVersion()} node ${process.version} ${
                process.platform
            } jest-min-reporter v${process.env.npm_package_version}`
        )
    );
};

export const printHeaderOnComplete = () => {
    printf(lightYellow("Summary reporter output:"));
    println(2);
};

export const printFailedTestDiffs = (results: AggregatedResult) => {
    const failed = results.testResults.filter((suite) => suite.failureMessage);

    failed.ifAny((suites: TestResult[]) => {
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

export const printPassedSuites = (suites: AggregatedResult) => {
    const passed = suites.testResults.filter(suiteFailed);

    if (passed.length > 0) {
        printf("Passed suites:");
        passed.ifAny((suites) => {
            suites.forEach((suite: TestResult) => {
                const fullPath = processFullPath(suite.testFilePath);
                const path = fullPath.path || "";
                const file = fullPath.file || "";
                printf(`${bgLightGreen(black(" PASS "))} ${path}${file}`);
            });
            println(2);
        });
    }
};

const printFailedTestNames = (suite: TestResult) => {
    suite.testResults
        .filter((test) => test.status === "failed")
        .forEach((test) => printf(`${red("  ? ")}${yellow(test.fullName)}`));
};

export const printFailedSuites = (suites: AggregatedResult) => {
    const failed = suites.testResults.filter(not(suiteFailed));

    if (failed.length > 0) {
        printf("Failed suites:");
        failed.ifAny((suites: TestResult[]) => {
            suites.forEach((suite: TestResult) => {
                const fullPath = processFullPath(suite.testFilePath);
                const path = fullPath.path || "";
                const file = fullPath.file || "";
                printf(`${bgLightRed(black(" FAIL "))} ${path}${white(file)}`);
                printFailedTestNames(suite);
            });
        });
        println(2);
    }
};

export const printUncheckedSnapshotsSummary = (snapshot: SnapshotSummary) => {
    printf(
        `${bgLightRed(
            black(" UNUSED SNAPSHOTS ")
        )}  found. 'npm t -- -u' to remove them`
    );
    snapshot.uncheckedKeysByFile.forEach((snapshotFiles) => {
        const fullPath = processFullPath(snapshotFiles.filePath);
        const path = fullPath.path || "";
        const file = fullPath.file || "";
        printf(`${path}${white(file)}`);
    });
    println(2);
};
